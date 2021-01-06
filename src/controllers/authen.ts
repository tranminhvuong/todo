import { NextFunction, Request, Response} from 'express';
import { User } from '../db/models/user';
import bcrypt from 'bcrypt';
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { sendMail } from '../../utils/mailer/sender';
import { randToken } from '../../utils/random/random_code';
import passport from 'passport';

export const getLogin = async (req: Request, res: Response) => {
  try {
    res.render('authenticate/login');
  } catch (error) {
    console.log(error);
  }
}

export const getSignup = async (req: any, res: Response) => {
  try {
    const errors = req.session.errors || {};
    const user = req.session.user || {};
    req.session.errors = null;
    req.session.user = null;
    res.render('authenticate/signup', {
      user,
      errors
    });
  } catch (error) {
    console.log(error);
  }
}

export const postLogin = passport.authenticate('local',
  { successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  });

export const postSignup = async (req: Request, res: Response) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const newUser = new User();
    newUser.fullName = req.body.fullName;
    newUser.email = req.body.email;
    newUser.passwordDigest = bcrypt.hashSync(req.body.password, salt);
    newUser.gender = req.body.gender === '0';
    newUser.activeToken = randToken();
    const customConfig: Config = {
      dictionaries: [colors, adjectives, animals],
      separator: '-',
      length: 3,
    };
    newUser.userName = uniqueNamesGenerator(customConfig);
    await newUser.save();

    await sendMail(newUser);
    res.redirect('/wait-active');
  } catch (error) {
    console.log(error);
    res.json(error)
  }
}

export const getInputInfo = async (req: Request, res: Response) => {
  try {
    res.render('authenticate/info');
  } catch (error) {
    res.json(error);
  }
};

export const getConfirmationCode = async (req: Request, res: Response) => {
  res.render('authenticate/confirm_code');
};

export const waitActive = async (req: Request, res: Response) => {
  res.render('authenticate/wait_active')
};

export const activeAccount = async (req: Request, res: Response) => {
  try {
    if (req.query && req.query.s) {
      const token = req.query.s as string;
      const user = await User.findAccountByActiveToken(token);
      if (!user || user.isActive || user.activeToken !== token) {
        throw new Error('Invalid Request');
      }
      user.activeToken = '';
      user.isActive = true;
      await user.save();
      res.redirect('/')
    } else {
      throw new Error('Missing active token')
    }
  } catch (error) {
    console.log(error.stack);
    res.send(error)
  }
};
