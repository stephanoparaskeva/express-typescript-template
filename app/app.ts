import express, { Application } from 'express';
import { applyMiddleware } from './lib/utilities/apply-utils';
import errorMiddleware from './lib/middleware/error-mware';
import middleware from './lib/middleware/common-mware';
import routes from './lib/middleware/routing-mware';

const app: Application = express();

const applyMiddlewareToApp = applyMiddleware(app);

applyMiddlewareToApp(middleware);
applyMiddlewareToApp(routes);
applyMiddlewareToApp(errorMiddleware);

export default app;
