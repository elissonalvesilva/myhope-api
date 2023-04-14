import { Request, Response, NextFunction } from 'express';
import { Middleware } from '@/presenters/protocols';
import pino from 'pino';

const logger = pino({});

declare global{
  namespace Express {
    interface Request {
        userId: string
    }
  }
}

export const adaptMiddlewareSchema = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {}),
    };
    const httpResponse = await middleware.handle(request);
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      next();
    } else {
      logger.error({
        status: httpResponse.statusCode,
        error: httpResponse.body
      });
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
}