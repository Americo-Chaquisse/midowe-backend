import { UserDataType } from './../helper/types';
import { Campaigns, CampaignType } from '../repository/schema';

async function createCampaign(
  categoryId: string,
  userId: string,
  userData: UserDataType,
  title: string,
  description: string,
  profileImage: string,
  additionalImages: [],
  targetAmount: number,
  targetDate: string
): Promise<CampaignType> {
  return await Campaigns.create({
    categoryId,
    userId,
    title,
    userData,
    description,
    profileImage,
    additionalImages,
    targetAmount,
    targetDate: new Date(targetDate),
    status: 'pending',
    statusAt: new Date(),
    statusBy: 'system',
    totalDonations: 0,
    totalAmount: 0,
  });
}

async function getCampaignById(
  categoryId: string,
  campaignId: string
): Promise<CampaignType> {
  const campaign = await Campaigns.get({
    pk: `category:${categoryId}`,
    sk: campaignId,
  });
  if (campaign == undefined) {
    throw new Error(
      `Not found campaign. categoryId: ${categoryId}, campaignId: ${campaignId}`
    );
  }
  return campaign;
}

async function getCampaignsByCategory(
  categoryId: string,
  limit = 10,
  lastCampaignId: string | undefined
): Promise<CampaignType[]> {
  let next;
  if (lastCampaignId != undefined) {
    next = {
      pk: `category:${categoryId}`,
      sk: lastCampaignId,
    };
  }
  return await Campaigns.find(
    { pk: `category:${categoryId}` },
    { limit, next, reverse: true }
  );
}

export { createCampaign, getCampaignById, getCampaignsByCategory };
