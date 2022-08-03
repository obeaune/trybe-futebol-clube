import { Router } from 'express';
import 'express-async-errors';
import validateToken from '../middlewares/validateToken';
import MatchesController from '../controllers/MatchesController';

export default Router()
  .get('/', MatchesController.getMatches)
  .get('/:id', MatchesController.getById)
  .post('/', validateToken, MatchesController.createMatch)
  .patch('/:id/finish', MatchesController.updateProgress)
  .patch('/:id', MatchesController.changeScoreboard);
