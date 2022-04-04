import { handler } from '../../../src/lambda/spotlight/get-by-type';
import { Spotlight } from '../../../src/repository/schema';
import { createCampaign } from '../../../src/service/campaign-service';

describe('Get featured campaigns', () => {
  it('should return all featured campaigns', async () => {
    const created = await createCampaign({
      categoryId: 'arte',
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
    await Spotlight.create({
      spotType: 'featured',
      categoryId: created.categoryId,
      campaignId: created.campaignId,
    });

    const response = await handler({
      pathParameters: { spotType: 'featured' },
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).length).toBeGreaterThan(0);
  });

  it('should return all trending campaigns', async () => {
    const created = await createCampaign({
      categoryId: 'poesia',
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
    await Spotlight.create({
      spotType: 'trending',
      categoryId: created.categoryId,
      campaignId: created.campaignId,
    });

    const response = await handler({
      pathParameters: { spotType: 'trending' },
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).length).toBeGreaterThan(0);
  });
});
