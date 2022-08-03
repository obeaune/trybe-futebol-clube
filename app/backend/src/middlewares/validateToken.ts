import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import HttpException from '../shared/HttpException';

const secret = process.env.JWT_SECRET || 'temporarySecret';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  // without token
  if (!token) throw new HttpException(401, 'Token must be a valid token');

  // verify token
  try {
    jwt.verify(token, secret);
    next();
  } catch (err) {
    throw new HttpException(401, 'Token must be a valid token');
  }
};

export default validateToken;
