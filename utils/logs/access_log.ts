import { NextFunction, Response } from "express";

export const logAccess: any = (req: any, res: Response, next: NextFunction) => {
  console.log(`
  ======================
    path: ${req.originalUrl},
    Method: ${req.method},
    Time: ${new Date().toString()},
    User: ${req.user ? req.user.userName : undefined}
  `);
  next();
};
