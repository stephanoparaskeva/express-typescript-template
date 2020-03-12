import { Router, Application } from 'express';
import { applyRoutes } from '../utilities/apply-utils';
import { routesPath } from '../../config/settings';

const router = Router();

const prepareForApplyMiddleware = (prefix: string, appliedRouter: Router) => (app: Application) =>
  app.use(prefix, appliedRouter);

const apiRouter = prepareForApplyMiddleware('/api', applyRoutes(router, routesPath, '.route.'));

export default [apiRouter];
