import { Middleware } from '../../meta/types/common-types';

export const indexCategoriesController: Middleware = async (_req, _res, _next) => {
  try {
    const err = 'heyubbbbb';
    throw err;
  } catch (err) {
    throw new Error(err);
  }
};
