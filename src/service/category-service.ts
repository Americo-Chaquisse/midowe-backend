import { Categories, CategoryType } from '../repository/schema';

type CreateCategoryParams = {
  id: string;
  name: string;
  description: string;
};

async function createCategory({
  id,
  name,
  description,
}: CreateCategoryParams): Promise<CategoryType> {
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

export {
  CreateCategoryParams,
  createCategory,
  getAllCategories,
  getCategoryById,
};
