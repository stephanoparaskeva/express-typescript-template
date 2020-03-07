import helmet from 'helmet';
import { Router } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from '../../../support/logging/winston';

export const handleLogger = (router: Router) => router.use(logger);

export const handleHelmet = (router: Router) => router.use(helmet());

export const handleCors = (router: Router) => router.use(cors({ credentials: true, origin: true }));

export const handleBodyParser = (router: Router) => router.use(bodyParser.json());

export const handleBodyUrlEncoded = (router: Router) =>
  router.use(bodyParser.urlencoded({ extended: true }));

export const handleCompression = (router: Router) => router.use(compression());

export const handleCookies = (router: Router) => router.use(cookieParser());
