import 'reflect-metadata';
import { createServer } from 'http';
import { createConnection } from 'typeorm';
import { initiateProcessExit } from './lib/errors/process-errs';
import { port } from './config/settings';
import app from './app';

const server = createServer(app);

initiateProcessExit();

createConnection()
  .then(async () => server.listen(port, () => console.log(`Listening at http://localhost:${port}`)))
  .catch((err: Error) => console.log(err));

export default server;
