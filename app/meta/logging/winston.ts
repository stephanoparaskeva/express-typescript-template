import stream from 'stream';
import morgan from 'morgan';
import DailyRotateFile from 'winston-daily-rotate-file';
import winston, { format, loggers } from 'winston';
import { basename } from 'path';
import { Response } from 'express';
import { env } from '../../config/settings';

// logging level based on environment.
const level = env === 'development' ? 'debug' : 'info';

// daily file logging set up.
const dailyRotateFileTransport = new DailyRotateFile({
  filename: `${process.cwd()}/app/meta/logging/logs/%DATE%-logs.log`,
  datePattern: 'DD-MM-YYYY',
  format: format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`),
});

// default configuration for winston.
const configuration = {
  level,
  format: format.combine(
    format.label({ label: basename(process.mainModule?.filename || '') }),
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss',
    })
  ),
  exitOnError: false,
  transports: [dailyRotateFileTransport],
};

// configuration to enable morgan to work with default config globally.
const writeStream = { write: (message: string) => winston[level](message) };
const skip = (_: any, res: Response) => res.statusCode < 400;
winston.configure(configuration);
winston.stream = (_options?: any) => new stream.Duplex(writeStream);
const logger = morgan('combined', { stream: writeStream, skip });

// named loggers for dynamic logging.
loggers.add('realtimeLogger', configuration);

export default logger;
