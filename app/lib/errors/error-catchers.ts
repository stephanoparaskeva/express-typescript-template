import logger from 'winston';
import { QueryFailedError } from 'typeorm';
import { env } from '../../config/settings';
import { ErrorMiddleware } from '../../meta/types/common-types';
import { HTTPClientError } from './http-errs';

/**
 * @DESC: meant to be run as part of error handling middleware, checks for client
 * error which it sends to client if not moves on to next error (server error).
 */
export const clientErrorCatcher: ErrorMiddleware = (err, _req, res, next) => {
  if (err instanceof HTTPClientError) {
    res.status(err.statusCode).send(err.message);
  } else {
    next(err);
  }
};

/**
 * @DESC: meant to be run when an error occurs if that error was not a client error,
 * when in production this will send a minimal response, but in development sends a stack trace.
 * this is the final error catcher.
 */
export const serverErrorCatcher: ErrorMiddleware = (err, req, res, _next) => {
  console.error(req); // TODO: remove
  logger.error([err, req]);

  if (err instanceof QueryFailedError) {
    if (err.code === '23505') {
      // query failed due to duplicate key with unique constraint
      res.status(500).send(err.detail);
    }
  }

  if (env === 'dev') {
    res.status(500).send({ err, stack: err.stack?.split('\n') });
  }
  res.status(500).send('Internal Server Error');
};
