import { NextFunction, Request, Response } from "express";

export const logErrors = (err, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  next(err)
};

export const errorHandler = (err, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.render('error', { error: err });
};

export const clientErrorHandler = (err, req: Request, res: Response, next: NextFunction) => {
  if (req.xhr) {
    res.status(500).send({ error: err })
  }
  next(err);
};
