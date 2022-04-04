import { handler } from '../../../src/lambda/donation/get-by-campaign';
import { createCampaign } from '../../../src/service/campaign-service';
import { createDonation } from '../../../src/service/donation-service';

describe('Get donations of campaign', () => {
  it('should return a list of donations of specific campaigns', async () => {
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

    for (const item of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      await createDonation({
        categoryId: campaign.categoryId,
        campaignId: campaign.campaignId,
        transactionId: `TR000${item}`,
        conversationId: 'CONV1',
        responseCode: 'TS-01',
        userPhone: 841234567,
        userName: 'John Doe',
        userEmail: 'john.doe@email.com',
        amount: 5000,
      });
    }

    const response1 = await handler({
      pathParameters: {
        campaignId: campaign.campaignId,
      },
      queryStringParameters: {
        limit: '6',
        lastTransactionId: '',
      },
    });
    const body1 = JSON.parse(response1.body);

    expect(response1.statusCode).toBe(200);
    expect(body1.length).toBe(6);

    const response2 = await handler({
      pathParameters: {
        campaignId: campaign.campaignId,
      },
      queryStringParameters: {
        limit: '6',
        lastTransactionId: body1[body1.length - 1].transactionId,
      },
    });

    expect(response2.statusCode).toBe(200);
    expect(JSON.parse(response2.body).length).toBe(4);
  });
});
