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
  promise.then((data: any) => [null, data]).catch((e: Error) => [e]);

/**
 * @DESC: returns a formatted string for errors.
 */
export const errorFormat = (e: Error): string =>
  `NAME: ${e.name || 'Uncaught Exception'} - STATUS: ${(e as any).status || 500} - MESSAGE: ${
    e.message
  }`;
/**
 * @DESC: returns a formatted string for requests.
 */
export const requestFormat = (req: Request): string =>
  `URL: ${req.originalUrl} - METHOD: ${req.method} - REQ_IP: ${req.ip}`;

/**
 * @DESC: returns a formatted string for both errors and requests where request is optional.
 */
export const loggingFormat = (e: Error, req?: Request, additional: string = ''): string =>
  req
    ? `${errorFormat(e)} - ${requestFormat(req)} - ${additional}`
    : `${errorFormat(e)} - ${additional}`;
