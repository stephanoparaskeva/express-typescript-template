import helmet from 'helmet';
import { Application } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from '../../meta/logging/winston';

const handleLogger = (app: Application) => app.use(logger);

const handleHelmet = (app: Application) => app.use(helmet());

const handleCors = (app: Application) => app.use(cors({ credentials: true, origin: true }));

const handleBodyParser = (app: Application) => app.use(bodyParser.json());

const handleBodyUrlEncoded = (app: Application) =>
  app.use(bodyParser.urlencoded({ extended: true }));

const handleCompression = (app: Application) => app.use(compression());

const handleCookies = (app: Application) => app.use(cookieParser());

export default [
  handleLogger,
  handleHelmet,
  handleCors,
  handleBodyUrlEncoded,
  handleBodyParser,
  handleCompression,
  handleCookies,
];
