import { Categories, CategoryType } from '../repository/schema';

async function createCategory(
  id: string,
  name: string,
  description: string
): Promise<CategoryType> {
  return await Categories.create({
    id,
    name,
    description,
  });
}

async function getAllCategories(): Promise<CategoryType[]> {
  return await Categories.find();
}

async function getCategoryById(id: string): Promise<CategoryType> {
  const category = await Categories.get({ id });
  if (category == undefined) {
    throw new Error(`Not found category. id: ${id}`);
  }
  return category;
}

export { createCategory, getAllCategories, getCategoryById };
