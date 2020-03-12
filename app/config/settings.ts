import { config } from 'dotenv';

// configures dotenv reaching for .env file in project root
config();

export const env = process.env.APP_ENV || 'dev';
export const port = process.env.APP_PORT || 4444;
export const secret = process.env.APP_SECRET || 'secret';
export const extension = process.env.APP_FILE_EXTENSION || 'ts';
export const secureRoutesConstant = process.env.APP_SECURE_ROUTES_CONSTANT || true;
export const routesPath = process.env.APP_ROUTES_PATH || '../../components/';
