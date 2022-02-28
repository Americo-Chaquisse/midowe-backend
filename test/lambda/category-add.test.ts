import { handler } from '../../src/lambda/category-add';

describe('Add category', () => {
  it('Should add new category', async () => {
    const category = {
      id: 'habitacao',
      name: 'Habitação',
      description: 'Habitação / Casas / Escolas / Locais públicos',
    };

    const response = await handler({ body: JSON.stringify(category) });
    const addedCategory = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(addedCategory.id).toBe(category.id);
    expect(addedCategory.name).toBe(category.name);
    expect(addedCategory.description).toBe(category.description);
  });
});
