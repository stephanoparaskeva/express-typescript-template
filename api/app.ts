import http from 'http';
import express from 'express';
import { createConnection } from 'typeorm';
import { applyMiddleware, applyRoutes } from './lib/utilities/apply-util';
import errorHandlers from './lib/errors/handlers';
import middleware from './lib/middleware';
import { port, controllersPath } from './config/settings';
import { initiateProcessExit } from './lib/errors/process-err';
import 'reflect-metadata';

const router = express();
const server = http.createServer(router);

initiateProcessExit();
applyMiddleware(router, middleware);
applyRoutes(router, controllersPath);
applyMiddleware(router, errorHandlers);
createConnection()
  .then(async () => server.listen(port, () => console.log(`Running on http://localhost:${port}`)))
  .catch((e: Error) => console.log(e));

export default router;
