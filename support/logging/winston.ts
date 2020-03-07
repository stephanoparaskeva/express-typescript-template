import { Response } from 'express';
import path from 'path';
import stream from 'stream';
import winston, { format } from 'winston';
import morgan from 'morgan';
import DailyRotateFile from 'winston-daily-rotate-file';
import { env } from '../../api/config/settings';

const level = env === 'development' ? 'debug' : 'info';
const writeStream = { write: (message: string) => winston[level](message) };
const skip = (_: any, res: Response) => res.statusCode < 400;

const dailyRotateFileTransport = new DailyRotateFile({
  filename: `${process.cwd()}/support/logging/logs/%DATE%-logs.log`,
  datePattern: 'DD-MM-YYYY',
  format: format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`),
});

const configuration = {
  level,
  format: format.combine(
    format.label({ label: path.basename(process.mainModule?.filename || '') }),
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss',
    })
  ),
  exitOnError: false,
  transports: [dailyRotateFileTransport],
};

winston.configure(configuration);
winston.stream = (_options?: any) => new stream.Duplex(writeStream);

const logger = morgan('combined', { stream: writeStream, skip });

export default logger;
