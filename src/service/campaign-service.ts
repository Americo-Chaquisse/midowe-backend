import {
  Campaigns,
  CampaignType,
  Spotlight,
  SpotlightType,
} from '../repository/schema';

async function createCampaign(
  categoryId: string,
  userId: string,
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
  const category = await Campaigns.get({
    pk: `category:${categoryId}`,
    sk: campaignId,
  });
  if (category == undefined) {
    throw new Error(
      `Not found campaign. categoryId: ${categoryId}, campaignId: ${campaignId}`
    );
  }
  return category;
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

type SpotlightCategory = 'featured' | 'trending';

async function getSpotlightCampaigns(
  category: SpotlightCategory
): Promise<CampaignType[]> {
  const spotlights: SpotlightType[] = await Spotlight.find({
    pk: 'spotlight',
    sk: { begins_with: category },
  });
  const campaigns: CampaignType[] = [];

  for (const spotlight of spotlights) {
    const campaign = await getCampaignById(
      spotlight.categoryId,
      spotlight.campaignId
    );
    campaigns.push(campaign);
  }
  return campaigns;
}

export {
  createCampaign,
  getCampaignById,
  getCampaignsByCategory,
  SpotlightCategory,
  getSpotlightCampaigns,
};
