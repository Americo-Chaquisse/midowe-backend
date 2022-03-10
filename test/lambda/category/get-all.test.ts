import { handler } from '../../../src/lambda/category/get-all';

describe('Get all categories', () => {
  it('Should return all categories', async () => {
    const response = await handler();

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).length).toBeGreaterThan(0);
  });
});
