import { Request } from 'express';

/**
 * @DESC: either converts a single item to an array if it wasn't already or returns the original array.
 */
export const toArray = (potentialArr: any[] | any): any[] =>
  Array.isArray(potentialArr) ? potentialArr : [potentialArr];

/**
 * @DESC: a helper function to handle an error in a service while using async/await.
 * @USAGE:
 * 1. const [my_promise_error, my_promise_result] = await extractAwait(your_promise_here)
 * 2. if (my_promise_error) { throw new Error(my_promise_error) }
 * 3. my_promise_result...
 */
export const extractAwait = (promise: any): any[] =>
  promise.then((data: any) => [null, data]).catch((err: Error) => [err]);

/**
 * @DESC: returns a formatted string for errors.
 */
export const errorFormat = (err: Error): string =>
  `NAME: ${err.name || 'Uncaught Exception'} - STATUS: ${(err as any).status || 500} - MESSAGE: ${
    err.message
  } - STACK:${err.stack?.split('\n')[1]}`;

/**
 * @DESC: returns a formatted string for requests.
 */
export const requestFormat = (req: Request): string =>
  `URL: ${req.originalUrl} - METHOD: ${req.method} - REQ_IP: ${req.ip}`;

/**
 * @DESC: returns a formatted string for both errors and requests where request is optional.
 */
export const loggingFormat = (err: Error, req?: Request, additional: string = ''): string =>
  req
    ? `${errorFormat(err)} - ${requestFormat(req)} - ${additional}`
    : `${errorFormat(err)} - ${additional}`;
