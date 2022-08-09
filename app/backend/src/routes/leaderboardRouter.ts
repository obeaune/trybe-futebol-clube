import { Router } from 'express';
import 'express-async-errors';
import LeaderboardController from '../controllers/LeaderboardController';

export default Router()
  .get('/', LeaderboardController.getAll);
