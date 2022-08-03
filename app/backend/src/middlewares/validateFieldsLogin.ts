import { NextFunction, Request, Response } from 'express';
import HttpException from '../shared/HttpException';

const validateUser = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const errMsg = 'All fields must be filled';

  if (!email || !password) throw new HttpException(400, errMsg);

  next();
};

export default validateUser;
