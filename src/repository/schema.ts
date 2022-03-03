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
  format: 'onetable:1.1.0',
  indexes: {
    primary: {
      hash: 'pk',
      sort: 'sk',
    },
  },
  models: {
    Category: {
      pk: {
        type: String,
        value: 'category',
      },
      sk: {
        type: String,
        value: '${id}',
      },
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    Campaign: {
      pk: {
        type: String,
        value: 'category:${categoryId}',
      },
      sk: {
        type: String,
        value: '${campaignId}',
      },
      campaignId: {
        type: String,
        generate: 'ulid',
        validate: /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/i,
      },
      categoryId: {
        type: String,
        required: true,
      },
      userId: {
        //Use local/global secondary index
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      profileImage: {
        type: String,
      },
      additionalImages: {
        type: Array,
      },
      status: {
        type: String,
      },
      statusAt: {
        type: Date,
      },
      statusBy: {
        type: String,
      },
      targetAmount: {
        type: Number,
      },
      targetDate: {
        type: Date,
      },
      totalDonations: {
        type: Number,
      },
      totalAmount: {
        type: Number,
      },
    },
    Donation: {
      pk: {
        type: String,
        value: 'donation:${campaignId}',
      },
      sk: {
        type: String,
        value: '${transactionId}',
      },
      campaignId: {
        type: String,
        required: true,
      },
      transactionId: {
        type: String,
        required: true,
      },
      conversationId: {
        type: String,
        required: true,
      },
      thirdyPartyReference: {
        type: String,
        required: true,
      },
      responseCode: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      userName: {
        type: String,
      },
      userPhone: {
        type: String,
      },
      userEmail: {
        type: String,
      },
      message: {
        type: String,
      },
    },
    Spotlight: {
      pk: {
        type: String,
        value: 'spotlight',
      },
      sk: {
        type: String,
        value: '${spotType}:${categoryId}:${campaignId}',
      },
      spotType: {
        type: String,
        required: true,
      },
      categoryId: {
        type: String,
        required: true,
      },
      campaignId: {
        type: String,
        required: true,
      },
    },
  },
  params: {
    isoDates: true,
    timestamps: true,
  },
  version: '0.1.0',
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
export type SpotlightType = Entity<typeof schema.models.Spotlight>;

export const Categories = table.getModel<CategoryType>('Category');
export const Campaigns = table.getModel<CampaignType>('Campaign');
export const Donations = table.getModel<DonationType>('Donation');
export const Spotlight = table.getModel<SpotlightType>('Spotlight');
