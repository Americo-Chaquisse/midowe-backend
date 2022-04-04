import { createCampaign } from '../../../src/service/campaign-service';
import { handler } from '../../../src/lambda/spotlight/remove';
import { createSpotlightCampaign } from '../../../src/service/spotlight-service';

describe('Remove Spotlight', () => {
  it('Should remove a spotlight', async () => {
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

    createSpotlightCampaign(
      'trending',
      campaign.categoryId,
      campaign.campaignId
    );

    const response = await handler({
      pathParameters: {
        spotType: 'trending',
        categoryId: campaign.categoryId,
        campaignId: campaign.campaignId,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('{}');
  });
});
