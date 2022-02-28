import Dynamo from 'dynamodb-onetable/Dynamo';
import { Entity, Table } from 'dynamodb-onetable';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const client = new Dynamo({
  client: new DynamoDBClient({
    region: process.env.AWS_REGION,
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT || undefined,
  }),
});

const schema = {
  version: '0.1.0',
  format: 'onetable:1.0.0',
  indexes: {
    primary: {
      hash: 'pk',
      sort: 'sk',
    },
  },
  models: {
    Category: {
      pk: {
        type: 'string',
        value: 'category',
      },
      sk: {
        type: 'string',
        value: '${id}',
      },
      id: {
        required: true,
        type: 'string',
      },
      name: {
        required: true,
        type: 'string',
      },
      description: {
        required: true,
        type: 'string',
      },
    },
    Campaign: {
      pk: {
        type: 'string',
        value: 'campaign:${categoryId}',
      },
      sk: {
        type: 'string',
        value: '${campaignId}',
      },
      categoryId: {
        required: true,
        type: 'string',
      },
      campaignId: {
        required: true,
        type: 'string',
      },
      userId: {
        required: true,
        type: 'string',
      },
      title: {
        required: true,
        type: 'string',
      },
      description: {
        required: true,
        type: 'string',
      },
      profileImage: {
        required: true,
        type: 'string',
      },
      additionalImages: {
        required: true,
        type: 'set',
      },
      status: {
        type: 'string',
      },
      statusAt: {
        type: 'string',
      },
      statusBy: {
        type: 'string',
      },
      targetAmount: {
        type: 'number',
      },
      targetDate: {
        type: 'date',
      },
      totalDonations: {
        type: 'number',
      },
      totalAmount: {
        type: 'number',
      },
    },
    Donation: {
      pk: {
        type: 'string',
        value: 'donation:${campaignId}',
      },
      sk: {
        type: 'string',
        value: '${transactionId}',
      },
      campaignId: {
        required: true,
        type: 'string',
      },
      transactionId: {
        required: true,
        type: 'string',
      },
      conversationId: {
        required: true,
        type: 'string',
      },
      thirdyPartyReference: {
        required: true,
        type: 'string',
      },
      responseCode: {
        required: true,
        type: 'string',
      },
      amount: {
        required: true,
        type: 'number',
      },
      userName: {
        type: 'string',
      },
      userPhone: {
        type: 'string',
      },
      userEmail: {
        type: 'string',
      },
      message: {
        type: 'string',
      },
    },
  },
  params: {
    isoDates: true,
    timestamps: true,
  },
} as const;

const table = new Table({
  client,
  name: 'MidoweTable',
  schema,
  timestamps: true,
});

export type CategoryType = Entity<typeof schema.models.Category>;
export type CampaignType = Entity<typeof schema.models.Campaign>;
export type DonationType = Entity<typeof schema.models.Donation>;

export const Categories = table.getModel<CategoryType>('Category');
export const Campaigns = table.getModel<CampaignType>('Campaign');
export const Donations = table.getModel<DonationType>('Donation');
