import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import { User } from '../db/models/user';

passport.use(new LocalStrategy(
  {
    usernameField: 'loginId',
    passwordField: 'password'
  },
  // tslint:disable-next-line:only-arrow-functions
  function(username, password, done) {
    User.findAccountByLoginId(username, username, username).then(user => {
      if (!user) {
        return done(null, false, { message: 'LoginId or password is incorrect.' });
      }
      user.verifyPassword(password).then(check => {
        if (!check) return done(null, false, { message: 'LoginId or password is incorrect.' });
        else {
          return done(null, user);
        }
      })
    }).catch(err => done(err))
  }
));
