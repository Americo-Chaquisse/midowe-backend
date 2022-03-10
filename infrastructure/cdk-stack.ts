import { CfnOutput, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
} from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { Construct } from 'constructs';

export class MidoweBackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = createBaseTable(this);
    const httpApi = createHttpApi(this);
    const registerFunction = (
      name: string,
      apiPath: string,
      apiMethod: HttpMethod = HttpMethod.GET
    ) => {
      createFunction(this, table, httpApi, name, apiPath, apiMethod);
    };

    // Campaigns
    registerFunction('campaign/create', '/campaigns', HttpMethod.POST);
    registerFunction('campaign/get-by-category', '/campaigns/{categoryId}');
    registerFunction(
      'campaign/get-by-id',
      '/campaigns/{categoryId}/{campaignId}'
    );

    // Categories
    registerFunction('category/create', '/categories', HttpMethod.POST);
    registerFunction('category/get-all', '/categories');
    registerFunction('category/get-by-id', '/categories/{id}');

    // Spotlight
    registerFunction(
      'spotlight/create',
      '/spotlight/{spotType}/{categoryId}/{campaignId}',
      HttpMethod.POST
    );
    registerFunction('spotlight/get-by-type', '/spotlight/{spotType}');
    registerFunction(
      'spotlight/remove',
      '/spotlight/{spotType}/{categoryId}/{campaignId}',
      HttpMethod.DELETE
    );

    new CfnOutput(this, 'HttpApiUrl', { value: httpApi.apiEndpoint });
  }
}

function createBaseTable(stack: Stack) {
  return new Table(stack, 'MidoweTable', {
    billingMode: BillingMode.PAY_PER_REQUEST,
    partitionKey: { name: 'pk', type: AttributeType.STRING },
    removalPolicy: RemovalPolicy.RETAIN,
    sortKey: { name: 'sk', type: AttributeType.STRING },
    tableName: 'MidoweTable',
  });
}

function createHttpApi(stack: Stack) {
  return new HttpApi(stack, 'MidoweApi', {
    corsPreflight: {
      allowHeaders: ['Content-Type'],
      allowMethods: [CorsHttpMethod.ANY],
      allowOrigins: ['http://localhost:3000', 'https://midowe.co.mz'],
    },
  });
}

function createFunction(
  stack: Stack,
  table: Table,
  httpApi: HttpApi,
  name: string,
  apiPath: string,
  apiMethod: HttpMethod = HttpMethod.GET
) {
  const fn = new NodejsFunction(stack, `${name.replace('/', '-')}-fn`, {
    entry: `${__dirname}/../src/lambda/${name}.ts`,
    logRetention: RetentionDays.ONE_WEEK,
  });

  if (
    apiMethod === HttpMethod.POST ||
    apiMethod === HttpMethod.PUT ||
    apiMethod === HttpMethod.DELETE
  ) {
    table.grantReadWriteData(fn);
  } else {
    table.grantReadData(fn);
  }

  const fnApiIntegration = new HttpLambdaIntegration(`${name}-integration`, fn);

  httpApi.addRoutes({
    integration: fnApiIntegration,
    methods: [apiMethod],
    path: apiPath,
  });
}
