import {
  getLogin, getSignup,
  postLogin, postSignup,
  getConfirmationCode,
  waitActive,
  activeAccount
} from '../controllers/authen';
import { Router } from 'express';
import { signUpValidate } from '../middlewares/user_regist_validate'
import { loginValidate } from '../middlewares/user_login_validate';

const authenRouter = Router();
authenRouter.get('/login', getLogin)
  .post('/login', loginValidate, postLogin)
  .get('/sign-up', getSignup)
  .post('/sign-up', signUpValidate, postSignup)
  .get('/confirm-account', getConfirmationCode)
  .get('/wait-active', waitActive)
  .get('/confirm', activeAccount);
export default authenRouter;
