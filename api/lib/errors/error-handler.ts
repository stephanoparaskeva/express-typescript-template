import { Response, NextFunction } from 'express';
import { HTTPClientError, HTTP404Error } from './http-err';
import { env } from '../../config/settings';

const notFoundError = () => {
  throw new HTTP404Error('Method not found.');
};

const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    console.warn(err);
    res.status(err.statusCode).send(err.message);
  } else {
    next(err);
  }
};

const serverError = (err: Error, res: Response, _next: NextFunction) => {
  console.error(err);
  if (env === 'production') {
    res.status(500).send('Internal Server Error');
  } else {
    res.status(500).send(err.stack);
  }
};

export default {
  notFoundError,
  clientError,
  serverError,
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
//   router.use((e: ResponseError, req: Request, res: Response, _next: NextFunction) => {
//     console.log('Error Handler Ran\n', 'e.name =', e.name, e);
//     logger.error(loggingFormat(e, req));
//
//     if (e && e.name === 'JsonWebTokenError') {
//       return res.status(422).json({ error: e.name, message: e.message });
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
