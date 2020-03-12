import { Application, Request, Response, NextFunction } from 'express';

export type Middleware = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

export type ErrorMiddleware = (err: Error, res: Response, next: NextFunction) => void;

export type Wrapper = (application: Application) => void;

export type Route = {
  method: string;
  endpoint: string;
  middleware: Middleware | Middleware[];
  secure?: boolean;
};
