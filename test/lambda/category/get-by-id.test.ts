import { handler } from '../../../src/lambda/category/get-by-id';

describe('Get category by id', () => {
  it('Should return one category', async () => {
    const result = await handler({ pathParameters: { id: 'educacao' } });
    const category = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(category).toBeTruthy();
    expect(category.id).toBe('educacao');
    expect(category.name).toBe('Educação');
    expect(category.description).toBe('Educação / Formação / Cursos');
  });

  it('Should not return nonexistent category', async () => {
    const result = await handler({ pathParameters: { id: 'unknown' } });

    expect(result.statusCode).toBe(400);
  });
});
