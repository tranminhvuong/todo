import {
  showUserInfo, updateUserInfo
} from '../controllers/user';
import { Router } from 'express';
import { isAuth } from '../middlewares/authenticate';

const userRoutes = Router();
userRoutes.get('/user_info', isAuth, showUserInfo)
  .post('/user_info', isAuth, updateUserInfo);
export default userRoutes;
