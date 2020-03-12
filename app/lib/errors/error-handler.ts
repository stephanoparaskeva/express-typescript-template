import logger from 'winston';
import { env } from '../../config/settings';
import { HTTPClientError, HTTP404Error } from './http-errs';
import { loggingFormat } from '../utilities/common-utils';
import { ErrorMiddleware } from '../../meta/types/common-types';

// this middleware always runs if any middleware before (eg controller) it did not either return or res.
// it does nothing other than throw a http404error ready for error handling middleware.
// it is not error handling middleware it simply throws if no return or res occurs before it.
export const notFoundError = () => {
  console.log('ran not found');
  throw new HTTP404Error('Method Not Found.');
};

// this is error handling middleware, characterised by the fact that it takes 4 arguments.
// it therefore only runs when an error is thrown. eg a http404error.
// if the error thrown is a client error it'll catch and respond, if not it falls to next error handler.
export const clientError: ErrorMiddleware = (err, res, next) => {
  console.log('ran client error');
  if (err instanceof HTTPClientError) {
    console.warn(err); // TODO: remove
    logger.warn(loggingFormat(err));

    res.status(err.statusCode).send(err.message);
  } else {
    next(err);
  }
};

// this is the final error handling middleware (taking 4 args), it always sends a res.
// the response it sends depends on whether the application is in production or not.
export const serverError: ErrorMiddleware = (err, res, _next) => {
  console.log('ran server error');
  console.error(err); // TODO: remove
  logger.error(loggingFormat(err));

  if (env === 'production') {
    res.status(500).send('Internal Server Error');
  } else {
    res.status(500).send(err.stack);
  }
};

// import { Router, Request, Response, NextFunction } from 'express';
// import logger from 'winston';
// import { loggingFormat } from '../utilities/common-util';
//
// type ResponseError = Error & {
//   status?: number;
// };
//
// const errorHandler = (router: Router) => {
//   router.use((err: ResponseError, req: Request, res: Response, _next: NextFunction) => {
//     console.log('Error Handler Ran\n', 'err.name =', err.name, err);
//     logger.error(loggingFormat(err, req));
//
//     if (err && err.name === 'JsonWebTokenError') {
//       return res.status(422).json({ error: err.name, message: err.message });
//     }
//
//     return res.status(500).send({
//       message: 'UNCAUGHT EXCEPTION',
//       type: 'Uncaught Exception',
//       data: {},
//     });
//   });
// };
//
// export default errorHandler;
