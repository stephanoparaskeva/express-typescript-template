import { errors } from 'celebrate';
import { clientErrorCatcher, serverErrorCatcher } from '../errors/error-catchers';
import { Wrapper } from '../../meta/types/common-types';
import { HTTP404Error } from '../errors/http-errs';

const throwNotFound = () => {
  throw new HTTP404Error('Method Not Found');
};

/**
 *  @DESC this is not error handling middleware, as throwNotFound does not take 4 arguments.
 *  the middleware used here always gets skipped if an error is thrown before this middleware runs.
 *  it will run if any middleware before it did not either return or res.
 *  it does nothing other than throw an http404error as a fallback, ready for error handling middleware below.
 */
const errorThrowFallback: Wrapper = app => app.use(throwNotFound);

/**
 *  @DESC ***********************
 */
const handleCelebrateErrors: Wrapper = app => app.use(errors());

/**
 *  @DESC the middleware used here is error handling middleware, characterised by the fact that the
 *  clientErrorCatcher middleware takes 4 arguments. it runs when an error is thrown. eg the HTTP404Error above,
 *  or a previous error if one occurs before. if the error thrown is a client error it'll catch and
 *  respond, if not it falls through to next error catcher.
 */
const handleClientError: Wrapper = app => app.use(clientErrorCatcher);

/**
 *  @DESC the middleware used here is error handling middleware, and is the final error handling middleware
 *  (serverErrorCatcher middleware takes 4 args), it always sends a res. the response it sends depends on whether
 *  the application is in production or not. if in production, it responds with 'Internal Server Error'.
 *  else it responds with the stack trace.
 */
const handleServerError: Wrapper = app => app.use(serverErrorCatcher);

export default [errorThrowFallback, handleCelebrateErrors, handleClientError, handleServerError];
