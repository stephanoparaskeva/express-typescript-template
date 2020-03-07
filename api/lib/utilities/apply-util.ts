import glob from 'glob';
import path from 'path';
import { red } from 'chalk';
import { Router } from 'express';
import { toArray } from './common-util';
import { isRouteType, isObjectOrArrayHasContent } from './checking-util';
import { skip } from '../middleware/custom-mware';
import { Route, Wrapper, Middleware } from '../../meta/types/common-type';
import { secureRoutesConstant, extension } from '../../config/settings';
import { ROUTE_FAILED_MESSAGE as message } from '../../meta/constants/string-const';

const addToRouter = (router: Router, route: Route, filename: string) => {
  const { endpoint, controller, method, isSecure } = route;

  const acceptableRoute: object | boolean = isRouteType(route);
  if (!acceptableRoute) console.error(filename, red(message), route);
  if (!acceptableRoute) return;

  const makeSecure: Middleware = isSecure || secureRoutesConstant ? skip : skip;

  (router as any)[method](endpoint, [makeSecure, ...toArray(controller)]);
};

const addEach = (router: Router, allRoutes: any[], filename: string) =>
  allRoutes.forEach((route: Route) => addToRouter(router, route, filename));

export const applyRoutes = (router: Router, relativePath: string) =>
  glob
    .sync(`**/*.${extension}`, { cwd: path.join(`${__dirname}/`, relativePath) })
    .filter((filename: string) => /.route./g.test(filename))
    .map((filename: string) => ({ exports: require(`${relativePath}${filename}`), filename }))
    .filter(({ exports }) => exports && isObjectOrArrayHasContent(exports.default))
    .map(({ exports, filename }) => ({ allRoutes: Object.values(exports.default), filename }))
    .forEach(({ allRoutes, filename }) => addEach(router, allRoutes, filename));

export const applyMiddleware = (router: Router, middlewareWrappers: Wrapper[]) =>
  middlewareWrappers.forEach((wrapper: Wrapper) => wrapper(router));
