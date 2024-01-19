import { NextFunction, Request } from 'express';
import passport from 'passport';

export default class Auth {
    private static isDevMode = process.env.NODE_ENV === 'development';
    public static adminProtected = this.isDevMode
        ? (_: Request, __: never, next: NextFunction) => {
              _.user = { id: 1 };
              return next();
          }
        : passport.authenticate('admin', { session: false });
}
