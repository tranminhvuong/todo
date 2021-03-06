import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { User } from '../db/models/user';
import { UserRegist } from '../db/models/user_regist';

export const signUpValidate = async (req: any, res: Response, next: NextFunction) => {
  const user = new UserRegist();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.gender = req.body.gender === '0';
  user.agreeTerm = req.body.agreeTerm;
  const results = await validate(user);
  if (req.body.email) {
    const existUser = await User.findAccountByEmail(req.body.email);
    if (existUser) {
      results.push({
        value: req.body.email,
        property: 'email',
        constraints: { email: 'email is exist. Please use another email' },
        children: []
      })
    }
  }
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
