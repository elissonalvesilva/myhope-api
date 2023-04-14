import BaseController from '@/presenters/protocols/base-controller';
import { Request, Response } from 'express';
import pino from 'pino';

const logger = pino({});

export const adaptRoute = (controller: BaseController) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {}),
      userId: req.userId,
    };

    const httpResponse = await controller.handle(request);
    
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      logger.info({
        status: httpResponse.statusCode,
        data: httpResponse.body,
      });
      res.status(httpResponse.statusCode).json(httpResponse.body);
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
};