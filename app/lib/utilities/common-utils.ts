import Type from 'type-of-is';
import { Request, Response, NextFunction } from 'express';
import { Middleware } from '../../meta/types/common-types';

/**
 * @DESC: pipe function allowing for function composition.
 */
const _pipe = (f: Function, g: Function) => (...args: any[]) => g(f(...args));
export const pipe = (...fns: Function[]) => fns.reduce(_pipe);

/**
 * @DESC: a helper function to handle an error in a service while using async/await.
 * @USAGE:
 * 1. const [my_promise_error, my_promise_result] = await extractAwait(your_promise_here)
 * 2. if (my_promise_error) { throw new Error(my_promise_error) }
 * 3. else my_promise_result...
 */
export const extractAwait = (promise: any): any[] =>
  promise.then((data: any) => [null, data]).catch((err: Error) => [err]);

/**
 * @DESC: either converts an item to an array if it wasn't already or returns the original array.
 */
export const toArray = (potentialArr: any[] | any): any[] =>
  Type.is(potentialArr, Array) ? potentialArr : [potentialArr];

/**
 * @DESC: returns a formatted string for errors.
 */
export const errorFormatter = (err: any, info?: string): string =>
  `NAME: ${err.name || ''} - STATUS_CODE: ${(err as any).statusCode ||
    ''} - MESSAGE: ${err.message || ''} - STACK:${err.stack?.split('\n')[1] ||
    ''} - ERR_INFO: ${info || ''}`;

/**
 * @DESC: returns a formatted string for requests.
 */
export const requestFormatter = (req: any, info?: string): string =>
  `URL: ${req.originalUrl || ''} - METHOD: ${req.method || ''} - REQ_IP: ${req.ip ||
    ''} - CURRENT_USER_ID: ${req.currentUserId} - REQ_INFO: ${info ||
    ''} - RAW_HEADERS: ${req.rawHeaders.join('|')} - REMOTE_ADDR: ${req._remoteAddress}`;

/**
 * @DESC: returns a formatted string for both errors and requests.
 */
export const errorRequestFormatter = (err?: Error, req?: Request): string =>
  `${errorFormatter(err || {})} - ${requestFormatter(req || {})}`;

/**
 * @DESC: formats logs based on what datatype the logger is called with, if an array eg  [err, req],
 * the array is passed in, the message is formatted using errorRequestFormatter. else it is not.
 */
export const logFormatter = (log: any) => {
  const message = Type.is(log.message, Array) ? errorRequestFormatter(...log.message) : log.message;
  return `${JSON.stringify({ ...log, message })},`;
};

/**
 * @DESC: takes a string and returns after removing last newline.
 */
export const removeNewline = (message: string): string =>
  message.substring(0, message.lastIndexOf('\n'));

/**
 * @DESC: takes an array and an item and returns true if that array contains more than 1 of said item
 */
export const isDuplicate = (a: any[], b: any) => a.filter(c => b === c).length > 1;

/**
 * @DESC: function that simply skips to next middleware.
 */
export const skip: Middleware = (_req: Request, _res: Response, next: NextFunction) => next();
