import { handler } from '../../../src/lambda/donation/create';
import { createCampaign } from '../../../src/service/campaign-service';

describe('Register a donation', () => {
  it('Should register a new donation', async () => {
    process.env['SKIP_MPESA_BILL'] = 'true';

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

    const randomId = new Date().getMilliseconds();
    const donation = {
      categoryId: campaign.categoryId,
      campaignId: campaign.campaignId,
      transactionId: `TR${randomId}`,
      userName: 'John Doe',
      userEmail: 'john.doe@email.com',
      userPhone: 842058817,
      amount: 5000,
    };

    const response = await handler({
      body: JSON.stringify(donation),
    });

    const addedDonation = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(addedDonation.responseCode).toBe('INS-0');
  });
});
