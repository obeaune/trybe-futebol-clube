import { Router } from 'express';
import LoginRouter from './loginRouter';
import TeamsRouter from './teamsRouter';
import MatchesRouter from './matchesRouter';
import LeaderboardRouter from './leaderboardRouter';

const indexRouter = Router();

indexRouter.use('/login', LoginRouter);

indexRouter.use('/teams', TeamsRouter);

indexRouter.use('/matches', MatchesRouter);

indexRouter.use('/leaderboard', LeaderboardRouter);

export default indexRouter;
