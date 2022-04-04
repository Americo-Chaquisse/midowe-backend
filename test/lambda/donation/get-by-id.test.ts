import { handler } from '../../../src/lambda/donation/get-by-id';
import { createDonation } from '../../../src/service/donation-service';
import { createCampaign } from '../../../src/service/campaign-service';

describe('Get donation by id', () => {
  it('Should get one donation by transaction id', async () => {
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

    await createDonation({
      categoryId: campaign.categoryId,
      campaignId: campaign.campaignId,
      transactionId: 'TR0001',
      conversationId: 'CONV1',
      responseCode: 'TS-01',
      userPhone: 841234567,
      userName: 'John Doe',
      userEmail: 'john.doe@email.com',
      amount: 5000,
    });

    const result = await handler({
      pathParameters: {
        campaignId: campaign.campaignId,
        transactionId: 'TR0001',
      },
    });

    const donation = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(donation).toBeTruthy();
    expect(donation.campaignId).toBe(campaign.campaignId);
    expect(donation.transactionId).toBe('TR0001');
  });

  it('Should not return nonexistent donation', async () => {
    const result = await handler({
      pathParameters: { campaignId: 'CAMPAIGN01', transactionId: 'TR0000' },
    });

    expect(result.statusCode).toBe(400);
  });
});
