import stream from 'stream';
import morgan from 'morgan';
import DailyRotateFile from 'winston-daily-rotate-file';
import winston, { format, loggers } from 'winston';
import { Response } from 'express';
import { removeNewline, logFormatter } from '../../lib/utilities/common-utils';

// locally used strings.
const level = 'error';
const timePattern: string = 'HH:mm:ss';
const datePattern: string = 'DD-MM-YYYY';
const dateTime: string = `${datePattern} ${timePattern}`;
const relativePath: string = '/app/meta/logging/logs/%DATE%-logs.log';
const defaultFilename: string = `${process.cwd()}${relativePath}`;

// daily file logging transport set-up.
const defaultTransportation = new DailyRotateFile({
  format: format.printf(logFormatter),
  filename: defaultFilename,
  datePattern,
});

// default configuration for winston.
const defaultConfiguration = {
  format: format.timestamp({ format: dateTime }),
  transports: [defaultTransportation],
  exitOnError: false,
  level,
};

// named loggers for dynamic logging.
loggers.add('realtimeLogger', defaultConfiguration);

// configuration for default winston logger to work with default config.
const write = (message: string) => winston[level](removeNewline(message));
winston.configure(defaultConfiguration);
winston.stream = (_options?: any) => new stream.Duplex({ write });

// configuration for morgan logger to work with default config for use in express.
const skip = (_: any, res: Response) => res.statusCode < 500;
const morganWinston = morgan('combined', { stream: { write }, skip });

export default morganWinston;
