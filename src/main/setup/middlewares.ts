import { Express } from 'express';
import { bodyParser, contentType, cors } from '@/main/middlewares';
import expressPinoLogger from 'express-pino-logger';

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
  app.use(expressPinoLogger);
};