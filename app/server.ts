import 'reflect-metadata';
import { createServer } from 'http';
import { createConnection } from 'typeorm';
import { initiateProcessExit } from './lib/errors/process-errs';
import { port, exitOnException } from './config/settings';
import app from './app';

const server = createServer(app);

initiateProcessExit(exitOnException as boolean);

createConnection()
  .then(async () => server.listen(port, () => console.log(`Listening on http://localhost:${port}`)))
  .catch((err: Error) => console.log(err));

export default server;
