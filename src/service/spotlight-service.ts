import { CampaignType, Spotlight, SpotlightType } from '../repository/schema';
import { getCampaignById } from './campaign-service';

type SpotType = 'featured' | 'trending';

async function createSpotlightCampaign(
  spotType: SpotType,
  categoryId: string,
  campaignId: string
): Promise<SpotlightType> {
  const campaign: CampaignType = await getCampaignById(categoryId, campaignId);
  return await Spotlight.create({
    spotType,
    categoryId: campaign.categoryId,
    campaignId: campaign.campaignId,
  });
}

async function removeSpotlightCampaign(
  spotType: SpotType,
  categoryId: string,
  campaignId: string
) {
  await Spotlight.remove({
    pk: 'spotlight',
    sk: `${spotType}:${categoryId}:${campaignId}`,
  });
}

async function getSpotlightCampaigns(
  spotType: SpotType
): Promise<CampaignType[]> {
  const spotlights: SpotlightType[] = await Spotlight.find({
    pk: 'spotlight',
    sk: { begins_with: spotType },
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
  SpotType,
  createSpotlightCampaign,
  removeSpotlightCampaign,
  getSpotlightCampaigns,
};
