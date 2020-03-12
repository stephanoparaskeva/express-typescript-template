import glob from 'glob';
import path from 'path';
import { red } from 'chalk';
import { Application, Router } from 'express';
import { toArray } from './common-utils';
import { isRouteType, isObjectOrArrayHasContent } from './checking-utils';
import { skip } from '../middleware/custom-mware';
import { Route, Wrapper, Middleware } from '../../meta/types/common-types';
import { secureRoutesConstant, extension } from '../../config/settings';
import { ROUTE_FAILED_MESSAGE as message } from '../../meta/constants/string-consts';

const addToRouter = (router: Router, route: Route, filename: string) => {
  const { endpoint, middleware, method, secure = secureRoutesConstant } = route;

  const acceptableRoute: object | boolean = isRouteType(route);
  if (!acceptableRoute) console.error(filename, red(message), route);
  if (!acceptableRoute) return;

  const makeSecure: Middleware = secure ? skip : skip;

  (router as any).route(endpoint)[method](...[makeSecure, ...toArray(middleware)]);
};

const addEach = (router: Router, allRoutes: any[], filename: string) => {
  allRoutes.forEach((route: Route) => addToRouter(router, route, filename));
};

export const applyRoutes = (router: Router, relativePath: string, filenamePattern: string) => {
  const regexp = new RegExp(filenamePattern, 'g');

  glob
    .sync(`**/*.${extension}`, { cwd: path.join(`${__dirname}/`, relativePath) })
    .filter((filename: string) => regexp.test(filename))
    .map((filename: string) => ({ exports: require(`${relativePath}${filename}`), filename }))
    .filter(({ exports }) => exports && isObjectOrArrayHasContent(exports.default))
    .map(({ exports, filename }) => ({ allRoutes: Object.values(exports.default), filename }))
    .forEach(({ allRoutes, filename }) => addEach(router, allRoutes, filename));

  return router;
};

export const applyMiddleware = (application: Application) => (middlewareWrappers: Wrapper[]) =>
  middlewareWrappers.forEach((wrapper: Wrapper) => wrapper(application));
