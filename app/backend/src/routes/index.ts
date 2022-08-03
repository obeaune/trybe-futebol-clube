import { Router } from 'express';
import LoginRouter from './loginRouter';
import TeamsRouter from './teamsRouter';
import MatchesRouter from './matchesRouter';

const indexRouter = Router();

indexRouter.use('/login', LoginRouter);

indexRouter.use('/teams', TeamsRouter);

indexRouter.use('/matches', MatchesRouter);

export default indexRouter;
