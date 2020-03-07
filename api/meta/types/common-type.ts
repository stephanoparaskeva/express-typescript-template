import { Router, Request, Response, NextFunction } from 'express';

export type Middleware = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

export type Controller = Middleware | Middleware[];

export type Wrapper = (router: Router) => void;

export type Route = {
  method: string;
  endpoint: string;
  controller: Controller;
  isSecure?: boolean;
};
