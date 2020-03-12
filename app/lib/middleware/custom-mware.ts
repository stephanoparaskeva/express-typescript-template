import { Request, Response, NextFunction } from 'express';
import { Middleware } from '../../meta/types/common-types';

/**
 * @DESC: function that simply skips to next middleware.
 */
export const skip: Middleware = (_req: Request, _res: Response, next: NextFunction) => next();
