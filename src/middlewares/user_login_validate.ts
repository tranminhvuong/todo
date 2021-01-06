import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { UserLogin } from '../db/models/user_login';

export const loginValidate = async (req: any, res: Response, next: NextFunction) => {
  const user = new UserLogin();
  user.loginId = req.body.loginId;
  user.password = req.body.password;
  const results = await validate(user);
  console.log(results);
  if (results.length) {
    const err = results.reduce((obj: any, item) => {
      obj[item.property] = Object.values(item.constraints);
      return obj;
    }, {});
    req.session.errors = err;
    req.session.user = user;
    res.redirect('back');
  } else {
    next();
  }
};
