import { loggers, Logger } from 'winston';
import { errorFormatter } from '../utilities/common-utils';

/**
 * @DESC: function that takes in a type of process event to listen for, eg 'uncaughtException' and
 * sets the process to log to logger when event occurs and process.exit with an exit code of 1.
 */
export const processExit = (type: any) =>
  process.on(type, (err: Error) => {
    const realtimeLogger: Logger = loggers.get('realtimeLogger');

    realtimeLogger.error(errorFormatter(err, type));

    realtimeLogger.on('finish', () => {
      realtimeLogger.end();
      console.log('No longer listening:', type); // TODO: remove
      process.exit(1);
    });
  });

/**
 * @DESC: function taking in a boolean of whether it should cause process exits, and initiates
 * listening of events.
 */
export const initiateProcessExit = (exitOnException: boolean): void => {
  if (exitOnException) {
    // log and exit for uncaughtException events.
    processExit('uncaughtException');
    // log and exit for unhandledRejection events.
    processExit('unhandledRejection');
  }
};
