import createHttpError from 'http-errors';
import { getRepository, UpdateResult } from 'typeorm';
import { NextFunction } from 'express';
import { Category } from './category.entity';

export const createCategoryService = async (
  data: categoryObject,
  next: NextFunction
): Promise<categoryObject | void> => {
  const { title, description } = data;
  const categoryRepo = getRepository(Category);

  try {
    const categoryBody = { title, description };
    const savedCategory = await categoryRepo.save(categoryBody);

    return savedCategory;
  } catch (err) {
    next(createHttpError(401, { err }));
  }
};

export const editCategoryService = async (
  data: categoryObject,
  categoryId: string,
  next: NextFunction
): Promise<categoryObject | void> => {
  const { title, description } = data;
  const categoryRepo = getRepository(Category);

  try {
    const categoryBody = { title, description };
    const editedCategory: UpdateResult = await categoryRepo.update(categoryId, categoryBody);

    return categoryBody;
  } catch (err) {
    next(err);
  }
};
