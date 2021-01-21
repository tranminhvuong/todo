import { NextFunction, Request, Response } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if(req.isAuthenticated()) {
    res.locals.currentUser = req.user
    next();
  } else {
    res.redirect('/login')
  }
};
