import {
  createCampaign,
  getCampaignById,
  getCampaignsByCategory,
} from '../../src/service/campaign-service';

describe('Test campaign service', () => {
  it('should create a campaign', async () => {
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

    expect(newCampaign).toBeTruthy();
    expect(newCampaign.categoryId).toBe('educacao');
    expect(newCampaign.campaignId).toBeTruthy();
  });

  it('should get campaign by id', async () => {
    const newCampaign = await createCampaign(
      'educacao',
      'achaquisse1@gmail.com',
      {
        fullName: 'Américo Tinga Chaquisse',
        pictureUrl:
          'https://i1.sndcdn.com/avatars-eihxIuzFW0OqgZjj-yVE8uQ-t240x240.jpg',
      },
      'Construcao de uma escola 0',
      'Long description',
      'http://localhost/main.png',
      [],
      50000,
      '2022-10-01'
    );

    const foundCampaign = await getCampaignById(
      newCampaign.categoryId,
      newCampaign.campaignId
    );
    expect(foundCampaign.categoryId).toBe(newCampaign.categoryId);
    expect(foundCampaign.campaignId).toBe(newCampaign.campaignId);
    expect(foundCampaign.userId).toBe(newCampaign.userId);
    expect(foundCampaign.title).toBe(newCampaign.title);
    expect(foundCampaign.description).toBe(newCampaign.description);
  });

  it('should get campaigns of category', async () => {
    for (const item of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      await createCampaign(
        'nascimento',
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
    const page1 = await getCampaignsByCategory('nascimento', 6, undefined);
    expect(page1.length).toBe(6);

    const page2 = await getCampaignsByCategory(
      'nascimento',
      6,
      page1[page1.length - 1].campaignId
    );
    expect(page2.length).toBe(4);
  });
});
