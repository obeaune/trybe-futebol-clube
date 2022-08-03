import { Router } from 'express';
import 'express-async-errors';
import TeamsController from '../controllers/TeamsController';

export default Router()
  .get('/', TeamsController.getAll)
  .get('/:id', TeamsController.getById);
