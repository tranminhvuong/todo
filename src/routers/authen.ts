import {
  getLogin, getSignup,
  postLogin, postSignup,
  getInputInfo, getConfirmationCode,
  waitActive,
  activeAccount
} from '../controllers/authen';
import { Router } from 'express';
import { signUpValidate } from '../middlewares/user_regist_validate'

const authenRouter = Router();
authenRouter.get('/login', getLogin)
  .post('/login', postLogin)
  .get('/sign-up', getSignup)
  .post('/sign-up', signUpValidate, postSignup)
  .get('/your-profile', getInputInfo)
  .get('/confirm-account', getConfirmationCode)
  .get('/wait-active', waitActive)
  .get('/confirm', activeAccount);
export default authenRouter;
