import { handler } from '../../../src/lambda/campaign/get-by-id';
import { createCampaign } from '../../../src/service/campaign-service';

describe('Get campaign by id', () => {
  it('should get a campaign by id', async () => {
    const newCampaign = await createCampaign(
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
        categoryId: newCampaign.categoryId,
        campaignId: newCampaign.campaignId,
      },
    });

    const body = JSON.parse(response.body);
    expect(body.categoryId).toBe(newCampaign.categoryId);
    expect(body.campaignId).toBe(newCampaign.campaignId);

    expect(response.statusCode).toBe(200);
  });
});
