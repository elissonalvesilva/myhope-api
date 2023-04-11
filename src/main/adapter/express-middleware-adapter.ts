import { Request, Response, NextFunction } from 'express';
import { Middleware } from '@/presenters/protocols';

declare global{
  namespace Express {
    interface Request {
        userId: string
    }
  }
}

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      ...(req.headers || {}),
      ...(req.query || {}),
    };
    const httpResponse = await middleware.handle(request);
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      next();
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
}