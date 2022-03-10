import { Spotlight } from './../../src/repository/schema';
import { createCampaign } from '../../src/service/campaign-service';
import {
  createSpotlightCampaign,
  getSpotlightCampaigns,
  removeSpotlightCampaign,
} from '../../src/service/spotlight-service';

describe('Test spotlight service', () => {
  it('should create a spotlight campaign', async () => {
    const total = (await Spotlight.scan()).count;
    const created = await createCampaign(
      'nascimento',
      'achaquisse1@gmail.com',
      {
        fullName: 'Américo Tinga Chaquisse',
        pictureUrl:
          'https://i1.sndcdn.com/avatars-eihxIuzFW0OqgZjj-yVE8uQ-t240x240.jpg',
      },
      'Construcao de uma escola 222',
      'Long description',
      'http://localhost/main.png',
      [],
      50000,
      '2022-10-01'
    );
    await createSpotlightCampaign(
      'featured',
      created.categoryId,
      created.campaignId
    );
    await createSpotlightCampaign(
      'trending',
      created.categoryId,
      created.campaignId
    );

    const spotlights = await Spotlight.find({ pk: 'spotlight' });
    expect(spotlights.length).toBe((total ?? 0) + 2);
  });

  it('should remove a spotlight campaign', async () => {
    const items1 = await Spotlight.find({ pk: 'spotlight' });
    const created = await createCampaign(
      'nascimento',
      'achaquisse1@gmail.com',
      {
        fullName: 'Américo Tinga Chaquisse',
        pictureUrl:
          'https://i1.sndcdn.com/avatars-eihxIuzFW0OqgZjj-yVE8uQ-t240x240.jpg',
      },
      'Construcao de uma escola 222',
      'Long description',
      'http://localhost/main.png',
      [],
      50000,
      '2022-10-01'
    );
    await createSpotlightCampaign(
      'featured',
      created.categoryId,
      created.campaignId
    );

    const items2 = await Spotlight.find({ pk: 'spotlight' });
    expect(items2.length).toBe(items1.length + 1);

    await removeSpotlightCampaign(
      'featured',
      created.categoryId,
      created.campaignId
    );

    const items3 = await Spotlight.find({ pk: 'spotlight' });
    expect(items3.length).toBe(items1.length);
  });

  it('should get spotlight campaigns', async () => {
    for (const item of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      const created = await createCampaign(
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
      if (item < 4) {
        await createSpotlightCampaign(
          'featured',
          created.categoryId,
          created.campaignId
        );
      } else {
        await createSpotlightCampaign(
          'trending',
          created.categoryId,
          created.campaignId
        );
      }
    }

    const featured = await getSpotlightCampaigns('featured');
    expect(featured.length).toBe(3);

    const trending = await getSpotlightCampaigns('trending');
    expect(trending.length).toBe(7);
  });
});
