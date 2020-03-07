import logger from 'winston';
import { loggingFormat } from '../utilities/common-util';

export const processExit = (type: any) =>
  process.on(type, (e: Error) =>
    logger.error(loggingFormat(e, undefined, type), () => process.exit(1))
  );

export const initiateProcessExit = (): void => {
  processExit('uncaughtException');
  processExit('unhandledRejection');
};
