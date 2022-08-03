import { Router } from 'express';
import LoginRouter from './loginRouter';
import TeamsRouter from './teamsRouter';

const indexRouter = Router();

indexRouter.use('/login', LoginRouter);

indexRouter.use('/teams', TeamsRouter);

export default indexRouter;
