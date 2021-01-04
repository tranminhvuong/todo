import { NextFunction, Request, Response } from "express";

export const logAccess: any = (req: Request, res: Response, next: NextFunction) => {
  console.log(`
  ======================
    path: ${req.originalUrl},
    Method: ${req.method},
    Time: ${new Date().toString()},
    User: ${undefined}
  `);
  next();
};
