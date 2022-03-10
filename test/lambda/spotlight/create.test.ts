import { createCampaign } from '../../../src/service/campaign-service';
import { handler } from '../../../src/lambda/spotlight/create';

describe('Add Spotlight', () => {
  it('Should add new spotlight', async () => {
    const campaign = await createCampaign(
      'educacao',
      'achaquisse1@gmail.com',
      {
        fullName: 'Américo Tinga Chaquisse',
        pictureUrl:
          'https://i1.sndcdn.com/avatars-eihxIuzFW0OqgZjj-yVE8uQ-t240x240.jpg',
      },
      'Construcao de uma escola',
      'Long description',
      'http://localhost/main.png',
      [],
      50000,
      '2022-10-01'
    );
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
