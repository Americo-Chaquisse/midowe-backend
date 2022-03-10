import { handler } from '../../../src/lambda/campaign/create';

describe('Add campaign', () => {
  it('Should add new campaign', async () => {
    const campaign = {
      categoryId: 'nascimento',
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
    };

    const response = await handler({ body: JSON.stringify(campaign) });
    const addedCampaign = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(addedCampaign.campaignId).toBeTruthy();
    expect(addedCampaign.userId).toBe(campaign.userId);
    expect(addedCampaign.title).toBe(campaign.title);
  });
});
