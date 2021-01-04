import { NextFunction, Request, Response } from "express";

export const logErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  next(err)
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.render('error', { error: {
    statusCode: '500',
    message: err.message
  } });
};

export const clientErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (req.xhr) {
    res.status(500).send({ error: err })
  }
  next(err);
};
