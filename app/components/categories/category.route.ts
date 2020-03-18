import logger from 'winston';
import { getRepository } from 'typeorm';
import { Category } from './category.entity';
import { Route } from '../../meta/types/common-types';
import { editCategoryVal, createCategoryVal } from './category.validation';
import { createCategoryService, editCategoryService } from './category.service';

export const indexCategories: Route = {
  method: 'get',
  endpoint: '/categories',

  middleware: async (req, res, _next) => {
    const categoryRepo = getRepository(Category);

    try {
      const categories = await categoryRepo.find();

      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      logger.error([err, req]);

      throw err;
    }
  },
};

export const showCategory: Route = {
  method: 'get',
  endpoint: '/categories/:categoryId',

  middleware: async (req, res, _next) => {
    const { categoryId } = req.params;
    const categoryRepo = getRepository(Category);

    try {
      const allCategories = await categoryRepo.findOne(categoryId);

      res.status(200).json(allCategories);
    } catch (err) {
      console.log(err);
      logger.error([err, req]);

      throw err;
    }
  },
};

export const createCategory: Route = {
  method: 'post',
  endpoint: '/categories',

  middleware: [
    createCategoryVal,
    async (req, res, next) => {
      const { title, description } = req.body;
      const data: categoryObject = { title, description };

      const savedCategory = await createCategoryService(data, next);
      res.status(200).json(savedCategory);
    },
  ],
};

export const editCategory: Route = {
  method: 'patch',
  endpoint: '/categories/:categoryId',

  middleware: [
    editCategoryVal,
    async (req, res, next) => {
      const { title, description } = req.body;
      const { categoryId } = req.params;
      const data = { title, description };

      const editedCategory = await editCategoryService(data, categoryId, next);
      res.status(200).json(editedCategory);
    },
  ],
};

export const deleteCategory: Route = {
  method: 'delete',
  endpoint: '/categories/:categoryId',

  middleware: async (req, res, _next) => {
    const { categoryId } = req.params;
    const categoryRepo = getRepository(Category);

    try {
      const deletedResult = await categoryRepo.delete(categoryId);

      res.status(200).json(deletedResult);
    } catch (err) {
      console.log(err);
      logger.error([err, req]);

      throw err;
    }
  },
};
