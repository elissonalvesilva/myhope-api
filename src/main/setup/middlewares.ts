import { Express } from 'express';
import { bodyParser, contentType, cors } from '@/main/middlewares';
import expressPino from 'pino-http';

const logger = expressPino({
  level: "info",
})

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
  app.use(logger);
};