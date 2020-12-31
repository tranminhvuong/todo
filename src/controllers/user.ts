import { User } from '../db/models/user';
import { Request, Response, NextFunction } from 'express'

export const newUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = new User();
    user.fullName = 'Vuong Tran';
    user.gender = false;
    user.passwordDigest = 'abcd1234';
    await user.save();
    res.json(user)
  } catch (error) {
    res.json(error)
  }
};
