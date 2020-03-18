import express, { Application } from 'express';
import { applyMiddlewareToApp } from './lib/utilities/applying-utils';
import routesMiddleware from './lib/middleware/routing-mware';
import commonMiddleware from './lib/middleware/common-mware';
import errorsMiddleware from './lib/middleware/error-mware';

const app: Application = express();

const partiallyAppliedApp = applyMiddlewareToApp(app);

partiallyAppliedApp(commonMiddleware);
partiallyAppliedApp(routesMiddleware);
partiallyAppliedApp(errorsMiddleware);

export default app;
