import { Router } from 'express';
// import UserRouter from './userRouter';
import LoginRouter from './loginRouter';

const indexRouter = Router();

// indexRouter.use('/user', UserRouter);

indexRouter.use('/login', LoginRouter);

export default indexRouter;
