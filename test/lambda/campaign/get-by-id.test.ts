import { handler } from '../../../src/lambda/campaign/get-by-id';
import { createCampaign } from '../../../src/service/campaign-service';

describe('Get campaign by id', () => {
  it('should get a campaign by id', async () => {
    const newCampaign = await createCampaign({
      categoryId: 'educacao',
      userId: 'achaquisse1@gmail.com',
      userData: {
        fullName: 'Américo Tinga Chaquisse',
        pictureUrl:
          'https://i1.sndcdn.com/avatars-eihxIuzFW0OqgZjj-yVE8uQ-t240x240.jpg',
      },
      title: 'Construcao de uma escola 222',
      description: 'Long description',
      profileImage: 'http://localhost/main.png',
      additionalImages: [],
      targetAmount: 50000,
      targetDate: '2022-10-01',
    });

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
