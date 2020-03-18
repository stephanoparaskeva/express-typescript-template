import glob from 'glob';
import path from 'path';
import { Application, Router } from 'express';
import { toArray, skip } from './common-utils';
import { allowRoute } from './checking-utils';
import { Route, Wrapper } from '../../meta/types/common-types';
import { secureRoutesConstant, extension } from '../../config/settings';

/**
 * @DESC: curried function which takes an app argument and returns a function that is waiting for
 * an array of middleware wrappers eg (app) => app.use(middleware) applying each middleware to the
 * app in a forEach loop.
 */
export const applyMiddlewareToApp = (app: Application) => (middlewareWrappers: Wrapper[]) =>
  middlewareWrappers.forEach((wrapper: Wrapper) => wrapper(app));

/**
 * @DESC: function taking in a router, the relative path from invocation to routes files and a
 * filename pattern. It then dynamically requires each route file passing and passes the results
 * to be applied to the router that was passed in. The router is then prepared to be applied to the app.
 */
export const applyRoutesToRouter = (router: Router, relativePath: string, filePattern: string) => {
  const pathToRoute = (filename: string) => `${relativePath}${filename}`;
  const regExpTest = (filename: string) => new RegExp(filePattern, 'g').test(filename);

  const routesLocation: object = { cwd: path.join(`${__dirname}/`, relativePath) };
  const allFilenamesFromLocation: string[] = glob.sync(`**/*.${extension}`, routesLocation);
  const routeFilenames: string[] = allFilenamesFromLocation.filter(regExpTest);

  const routeRequires = routeFilenames.map((filename: string) => require(pathToRoute(filename)));
  const routes: Route[] = routeRequires.reduce((acc, curr) => [...acc, ...Object.values(curr)], []);

  routes.forEach((route: Route) => {
    if (!allowRoute(route, routes)) {
      return;
    }
    const { endpoint, middleware, method, secure = secureRoutesConstant } = route;
    // TODO: remove skip
    (router as any).route(endpoint)[method](secure ? skip : skip, ...toArray(middleware));
  });
  return router;
};
