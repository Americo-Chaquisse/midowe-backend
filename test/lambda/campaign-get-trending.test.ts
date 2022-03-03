import { handler } from '../../src/lambda/campaign-get-trending';
import { Spotlight } from '../../src/repository/schema';
import { createCampaign } from '../../src/service/campaign-service';

describe('Get featured campaigns', () => {
  it('should return all featured featured campaigns', async () => {
    const created = await createCampaign(
      'poesia',
      'achaquisse1@gmail.com',
      'Construcao de uma escola',
      'Long description',
      'http://localhost/main.png',
      [],
      50000,
      '2022-10-01'
    );
    await Spotlight.create({
      spotType: 'trending',
      categoryId: created.categoryId,
      campaignId: created.campaignId,
    });

    const response = await handler();

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).length).toBeGreaterThan(0);
  });
});
