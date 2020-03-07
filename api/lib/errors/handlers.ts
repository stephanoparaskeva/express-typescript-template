import { Request, Response, NextFunction, Router } from 'express';
import ErrorHandler from './error-handler';

const handle404Error = (router: Router) => {
  router.use((_req: Request, _res: Response) => {
    ErrorHandler.notFoundError();
  });
};

const handleClientError = (router: Router) => {
  router.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.clientError(err, res, next);
  });
};

const handleServerError = (router: Router) => {
  router.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.serverError(err, res, next);
  });
};

export default [handle404Error, handleClientError, handleServerError];
