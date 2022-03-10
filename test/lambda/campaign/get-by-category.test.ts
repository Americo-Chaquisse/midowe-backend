import { handler } from '../../../src/lambda/campaign/get-by-category';
import { createCampaign } from '../../../src/service/campaign-service';

describe('Get campaigns by category', () => {
  it('should return campaigns of specific category', async () => {
    for (const item of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      await createCampaign(
        'caridade',
        'achaquisse1@gmail.com',
        {
          fullName: 'Américo Tinga Chaquisse',
          pictureUrl:
            'https://i1.sndcdn.com/avatars-eihxIuzFW0OqgZjj-yVE8uQ-t240x240.jpg',
        },
        'Construcao de uma escola ' + item,
        'Long description',
        'http://localhost/main.png',
        [],
        50000,
        '2022-10-01'
      );
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
