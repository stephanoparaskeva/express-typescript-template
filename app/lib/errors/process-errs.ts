import { loggers, Logger } from 'winston';
import { loggingFormat } from '../utilities/common-utils';

export const processExit = (type: any) =>
  process.on(type, (err: Error) => {
    const realtimeLogger: Logger = loggers.get('realtimeLogger');

    realtimeLogger.error(loggingFormat(err, undefined, type));
    realtimeLogger.end();
    realtimeLogger.on('finish', () => {
      console.log('No longer listening.'); // TODO: remove
      process.exit(1);
    });
  });

export const initiateProcessExit = (): void => {
  processExit('uncaughtException');
  processExit('unhandledRejection');
};
