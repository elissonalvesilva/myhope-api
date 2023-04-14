import { Request, Response, NextFunction } from 'express';

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  const allowedOrigins = ['http://localhost:3000', 'https://myhope.vercel.app'];
  const origin = req.headers.origin || 'http://localhost:3000';
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Referer");
  res.header("Access-Control-Allow-credentials", 'true');
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE, OPTIONS");
  next();
};