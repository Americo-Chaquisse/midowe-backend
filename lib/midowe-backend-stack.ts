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

    const table = new Table(this, 'MidoweTable', {
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'pk', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      sortKey: { name: 'sk', type: AttributeType.STRING },
      tableName: 'MidoweTable',
    });

    const categoryAddFn = new NodejsFunction(this, 'categoryAddFn', {
      entry: `${__dirname}/../src/lambda/category-add.ts`,
      logRetention: RetentionDays.ONE_WEEK,
    });

    const categoryGetAllFn = new NodejsFunction(this, 'categoryGetAllFn', {
      entry: `${__dirname}/../src/lambda/category-get-all.ts`,
      logRetention: RetentionDays.ONE_WEEK,
    });

    const categoryGetByIdFn = new NodejsFunction(this, 'categoryGetByIdFn', {
      entry: `${__dirname}/../src/lambda/category-get-by-id.ts`,
      logRetention: RetentionDays.ONE_WEEK,
    });

    table.grantWriteData(categoryAddFn);
    table.grantReadData(categoryGetAllFn);
    table.grantReadData(categoryGetByIdFn);

    const api = new HttpApi(this, 'MidoweApi', {
      corsPreflight: {
        allowHeaders: ['Content-Type'],
        allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.POST],
        allowOrigins: ['*'],
      },
    });

    const categoryAddIntegration = new HttpLambdaIntegration(
      'categoryAddIntegration',
      categoryAddFn
    );

    const categoryGetAllIntegration = new HttpLambdaIntegration(
      'categoryGetAllIntegration',
      categoryGetAllFn
    );

    const categoryGetByIdIntegration = new HttpLambdaIntegration(
      'categoryGetByIdIntegration',
      categoryGetByIdFn
    );
    api.addRoutes({
      integration: categoryAddIntegration,
      methods: [HttpMethod.POST],
      path: '/categories',
    });

    api.addRoutes({
      integration: categoryGetAllIntegration,
      methods: [HttpMethod.GET],
      path: '/categories',
    });

    api.addRoutes({
      integration: categoryGetByIdIntegration,
      methods: [HttpMethod.GET],
      path: '/categories/{id}',
    });

    new CfnOutput(this, 'HttpApiUrl', { value: api.apiEndpoint });
  }
}
