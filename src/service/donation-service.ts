import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import {
  Donations,
  DonationType,
  dbClient,
  TABLE_NAME,
} from '../repository/schema';

type CreateDonationParams = {
  categoryId: string;
  campaignId: string;
  transactionId: string;
  conversationId: string;
  responseCode: string;
  userName?: string;
  userEmail?: string;
  userPhone: number;
  amount: number;
};

async function createDonation({
  categoryId,
  campaignId,
  transactionId,
  conversationId,
  responseCode,
  userPhone,
  userName = '',
  userEmail = '',
  amount,
}: CreateDonationParams): Promise<DonationType> {
  const donation = await Donations.create({
    campaignId,
    categoryId,
    transactionId,
    conversationId,
    responseCode,
    amount,
    userName,
    userPhone: userPhone + '',
    userEmail,
  });

  await dbClient.send(
    new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: { S: `category:${categoryId}` },
        sk: { S: campaignId },
      },
      ExpressionAttributeNames: {
        '#totalDonations': 'totalDonations',
        '#totalAmount': 'totalAmount',
      },
      ExpressionAttributeValues: {
        ':totalDonations': { N: `1` },
        ':totalAmount': { N: `${donation.amount}` },
      },
      UpdateExpression:
        'SET #totalDonations = #totalDonations + :totalDonations, #totalAmount = #totalAmount + :totalAmount',
    })
  );

  return donation;
}

async function getDonationById(
  campaignId: string,
  transactionId: string
): Promise<DonationType> {
  const donation = await Donations.get({
    pk: `donation:${campaignId}`,
    sk: transactionId,
  });

  if (donation == undefined) {
    throw new Error(
      `Not found donation. campaignId: ${campaignId}, transactionId: ${transactionId}`
    );
  }
  return donation;
}

async function getDonationsByCampaign(
  campaignId: string,
  limit = 10,
  lastTransactionId: string | undefined
): Promise<DonationType[]> {
  let next;
  if (lastTransactionId != undefined) {
    next = {
      pk: `donation:${campaignId}`,
      sk: lastTransactionId,
    };
  }
  return await Donations.find(
    { pk: `donation:${campaignId}` },
    { limit, next, reverse: true }
  );
}

export {
  CreateDonationParams,
  createDonation,
  getDonationById,
  getDonationsByCampaign,
};
