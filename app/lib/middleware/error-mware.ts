import { Request, Response, NextFunction, Application } from 'express';
import { notFoundError, clientError, serverError } from '../errors/error-handler';

const handle404Error = (app: Application) => app.use(() => notFoundError());

const handleClientError = (app: Application) =>
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) =>
    clientError(err, res, next)
  );

const handleServerError = (app: Application) =>
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) =>
    serverError(err, res, next)
  );

export default [handle404Error, handleClientError, handleServerError];
