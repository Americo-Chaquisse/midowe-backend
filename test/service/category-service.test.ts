import {
  createCategory,
  getAllCategories,
  getCategoryById,
} from '../../src/service/category-service';

describe('Test category service', () => {
  it('should create a category', async () => {
    const newCategory = await createCategory(
      'newId',
      'New Category',
      'Short description'
    );
    expect(newCategory).toBeTruthy();
    expect(newCategory.id).toBe('newId');
  });

  it('should return all categories', async () => {
    const categories = await getAllCategories();

    expect(categories.length).toBeGreaterThan(0);
  });

  it('should return a category by id', async () => {
    const category = await getCategoryById('educacao');

    expect(category).toBeTruthy();
    expect(category.id).toBe('educacao');
    expect(category.name).toBe('Educação');
    expect(category.description).toBe('Educação / Formação / Cursos');
  });
});
