import { Application, Request, Response, NextFunction } from 'express';
import { ErrnoException } from './common-interfaces';

/**
 * @DESC: strict type for all routes in route file exports to adhere to.
 */
export type Route = {
  method: string;
  endpoint: string;
  middleware: Middleware | Middleware[];
  secure?: boolean;
};

/**
 * @DESC: type for middleware functions.
 */
export type Middleware = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

/**
 * @DESC: type for error middleware handlers.
 */
export type ErrorMiddleware = (
  err: ErrnoException,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

/**
 * @DESC: type for app middleware wrapper functions eg (app) => app.use(middleware).
 */
export type Wrapper = (application: Application) => void;
