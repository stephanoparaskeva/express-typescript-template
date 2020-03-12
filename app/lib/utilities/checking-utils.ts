import { HTTP_VERBS } from '../../meta/constants/array-consts';
import { Route } from '../../meta/types/common-types';
import { toArray } from './common-utils';

/**
 * @DESC: checks for an array with at least one or more items.
 */
export const isArrayHasContent = (arr: any): boolean =>
  arr && Array.isArray(arr) && !Number.isNaN(arr.length) && arr.length > 0;

/**
 * @DESC: checks for an object with at least one or more values.
 */
export const isObjectHasContent = (obj: Object): boolean =>
  obj instanceof Object &&
  !Number.isNaN(Object.values(obj).length) &&
  Object.values(obj).length > 0;

/**
 * @DESC: checks for an array or an object with at least one or more items.
 */
export const isObjectOrArrayHasContent = (item: any[] | object): boolean =>
  isArrayHasContent(item) || isObjectHasContent(item);

/**
 * @DESC: returns true if given argument is a function or a function-array.
 */
export const isFunctionOrFunctionArray = (arr: Function | Function[]) =>
  !toArray(arr).every((one: Function) => typeof one === 'function');

/**
 * @DESC: checks whether given argement strictly follows the shape of the Route type.
 */
export const isRouteType = (route: Route) => {
  // if isSecure provided but not as boolean return false.
  if (route.secure && typeof route.secure !== 'boolean') {
    return false;
  }
  // if route has the same shape as Route type return route.
  if (
    route instanceof Object &&
    typeof route?.endpoint === 'string' &&
    typeof route?.method === 'string' &&
    HTTP_VERBS.includes(route.method) &&
    !isFunctionOrFunctionArray(route?.middleware)
  ) {
    return route;
  }
  // default return false.
  return false;
};
