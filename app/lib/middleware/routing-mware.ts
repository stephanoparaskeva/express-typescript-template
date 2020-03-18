import router from 'express-promise-router';
import { Router, Application } from 'express';
import { applyRoutesToRouter } from '../utilities/applying-utils';

/**
 * @DESC: curried function that takes in a router and returns a middleware wrapper function that takes
 * in the application and calls app.use with this router passed in. this function is exported from
 * file after partial application of the router (with prefix).
 */
const appUseRouter = (prefix: string, appliedRouter: Router) => (app: Application) =>
  app.use(prefix, appliedRouter);

const routerWithDotRoute = applyRoutesToRouter(router(), '../../components/', '.route.');
const preparedRouter = appUseRouter('', routerWithDotRoute);

export default [preparedRouter];
