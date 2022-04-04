import { handler } from '../../../src/lambda/campaign/get-by-category';
import { createCampaign } from '../../../src/service/campaign-service';

describe('Get campaigns by category', () => {
  it('should return campaigns of specific category', async () => {
    for (const item of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      await createCampaign({
        categoryId: 'caridade',
        userId: 'achaquisse1@gmail.com',
        userData: {
          fullName: 'Américo Tinga Chaquisse',
          pictureUrl:
            'https://i1.sndcdn.com/avatars-eihxIuzFW0OqgZjj-yVE8uQ-t240x240.jpg',
        },
        title: 'Construcao de uma escola ' + item,
        description: 'Long description',
        profileImage: 'http://localhost/main.png',
        additionalImages: [],
        targetAmount: 50000,
        targetDate: '2022-10-01',
      });
    }

    const response1 = await handler({
      pathParameters: {
        categoryId: 'caridade',
      },
      queryStringParameters: {
        limit: '6',
        lastCampaignId: '',
      },
    });
    const body1 = JSON.parse(response1.body);

    expect(response1.statusCode).toBe(200);
    expect(body1.length).toBe(6);

    const response2 = await handler({
      pathParameters: {
        categoryId: 'caridade',
      },
      queryStringParameters: {
        limit: '6',
        lastCampaignId: body1[body1.length - 1].campaignId,
      },
    });

    expect(response2.statusCode).toBe(200);
    expect(JSON.parse(response2.body).length).toBe(4);
  });
});
