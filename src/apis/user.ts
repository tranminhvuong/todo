import { Request, Response, NextFunction } from 'express';
import { User } from '../db/models/user';

export const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findAccountByLoginId('','','');
    if (!user) {
      return res.status(500).json({ error: 'Not Found'});
    } else {
      user.avatarUrl = req.body.avatar_url;
      await user.save();
      return res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
};
