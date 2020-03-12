import { Route } from '../../meta/types/common-types';
import { createUserController } from './user.controller';

const createUserRoute: Route = {
  endpoint: '/users',
  method: 'post',
  middleware: createUserController,
};

export default {
  createUserRoute,
};
