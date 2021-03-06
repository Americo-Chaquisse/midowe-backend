import { createCampaign } from '../../../src/service/campaign-service';
import { handler } from '../../../src/lambda/spotlight/create';

describe('Add Spotlight', () => {
  it('Should add new spotlight', async () => {
    const campaign = await createCampaign({
      categoryId: 'educacao',
      userId: 'achaquisse1@gmail.com',
      userData: {
        fullName: 'Américo Tinga Chaquisse',
        pictureUrl:
          'https://i1.sndcdn.com/avatars-eihxIuzFW0OqgZjj-yVE8uQ-t240x240.jpg',
      },
      title: 'Construcao de uma escola',
      description: 'Long description',
      profileImage: 'http://localhost/main.png',
      additionalImages: [],
      targetAmount: 50000,
      targetDate: '2022-10-01',
    });
    const response = await handler({
      pathParameters: {
        spotType: 'trending',
        categoryId: campaign.categoryId,
        campaignId: campaign.campaignId,
      },
    });
    const addedSpotlight = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(addedSpotlight.spotType).toBe('trending');
    expect(addedSpotlight.categoryId).toBe(campaign.categoryId);
    expect(addedSpotlight.campaignId).toBe(campaign.campaignId);
  });
});
