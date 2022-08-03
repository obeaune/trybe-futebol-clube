import { Router } from 'express';
import 'express-async-errors';
import LoginController from '../controllers/LoginController';
import validateUser from '../middlewares/validateFieldsLogin';

export default Router()
  .post('/', validateUser, LoginController.checkUser)
  .get('/validate', LoginController.checkCredentials);
