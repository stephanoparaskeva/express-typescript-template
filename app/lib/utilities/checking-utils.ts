import Type from 'type-of-is';
import { red } from 'chalk';
import { HTTP_VERBS } from '../../meta/constants/array-consts';
import { Route } from '../../meta/types/common-types';
import { toArray, isDuplicate } from './common-utils';

/**
 * @DESC: checks for an array with at least one or more items.
 */
export const isArrayHasContent = (arr: any): boolean =>
  arr && Type.is(arr, Array) && Type.is(arr.length, Number) && arr.length > 0;

/**
 * @DESC: checks for an object with at least one or more values.
 */
export const isObjectHasContent = (obj: Object): boolean => {
  return (
    Type.is(obj, Object) &&
    Type.is(Object.values(obj).length, Number) &&
    Object.values(obj).length > 0
  );
};

/**
 * @DESC: checks for an array or an object with at least one or more items.
 */
export const isObjectOrArrayHasContent = (item: any[] | object): boolean =>
  isArrayHasContent(item) || isObjectHasContent(item);

/**
 * @DESC: returns true if given argument is a function or a function-array.
 */
export const isFunctionOrFunctionArray = (arr: Function | Function[]) =>
  toArray(arr).every((oneOf: Function) => Type.is(oneOf, Function));

/**
 * @DESC: checks whether given argument strictly follows the shape of the Route type.
 */
export const isRouteType = (route: Route) => {
  // if 'secure' provided but not as boolean return false.
  if (route && route.secure && !Type.is(route.secure, Boolean)) {
    return false;
  }
  // if route has the same shape as Route type return route.
  if (
    Type.is(route, Object) &&
    Type.is(route?.endpoint, String) &&
    Type.is(route?.method, String) &&
    HTTP_VERBS.includes(route.method) &&
    isFunctionOrFunctionArray(route?.middleware)
  ) {
    return route;
  }
  // default return false.
  return false;
};

/**
 * @DESC: returns true if a route should be used by route, false otherwise.
 */
export const allowRoute = (route: Route, allRoutes: Route[]) => {
  const appropriateRoute: boolean | object = isRouteType(route);

  if (!appropriateRoute) {
    console.error(red('inappropriate route'), route);
    return false;
  }

  const routeStrings = allRoutes.map((r: Route) =>
    isRouteType(r) ? `${r.method}${r.endpoint}` : ''
  );
  const duplicateRoute: boolean = isDuplicate(routeStrings, `${route.method}${route.endpoint}`);

  if (duplicateRoute) {
    console.error(red('duplicate route'), route);
    return false;
  }
  return true;
};
