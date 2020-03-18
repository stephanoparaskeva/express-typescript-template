import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morganWinston from '../../meta/logging/winston';
import { Wrapper } from '../../meta/types/common-types';

const handleLogger: Wrapper = app => app.use(morganWinston);

const handleHelmet: Wrapper = app => app.use(helmet());

const handleCors: Wrapper = app => app.use(cors({ credentials: true, origin: true }));

const handleBodyParser: Wrapper = app => app.use(bodyParser.json());

const handleBodyUrlEncoded: Wrapper = app => app.use(bodyParser.urlencoded({ extended: true }));

const handleCookies: Wrapper = app => app.use(cookieParser());

const handleCompression: Wrapper = app => app.use(compression());

export default [
  handleLogger,
  handleHelmet,
  handleCors,
  handleBodyUrlEncoded,
  handleBodyParser,
  handleCookies,
  handleCompression,
];
