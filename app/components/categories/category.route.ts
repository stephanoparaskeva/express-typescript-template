import { Route } from '../../meta/types/common-types';
import { indexCategoriesController } from './category.controller';

const indexCategoriesRoute: Route = {
  method: 'get',
  endpoint: '/v1/categories',
  middleware: indexCategoriesController,
};

export default {
  indexCategoriesRoute,
};
