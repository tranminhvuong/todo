import { NextFunction, Request, Response} from 'express';
import { District } from '../db/models/district';
import { Province } from '../db/models/province';
import { User } from '../db/models/user';

export const updateUserInfo = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await User.findAccountByEmail(req.user.email);
    user.fullName = req.body.full_name;
    user.birthDay = req.body.birth_day;
    user.districtId = req.body.district;
    await user.save();
    req.session.passport.user = user;
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
}

export const showUserInfo = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = {
      ...req.user
    };
    user.district = !user.districtId ? '' : await District.findOne(user.districtId, {
      relations: ['province'],
    });
    user.avatarUrl = user.avatarUrl || '/images/signin-image.jpg'
    const provinces = await Province.find({
      relations: ['districts'],
    });
    res.render('users/info', { provinces, user });
  } catch (error) {
    next(error)
  }
}
