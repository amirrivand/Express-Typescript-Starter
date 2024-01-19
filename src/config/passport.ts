import passport from 'passport';
import { Strategy, VerifyCallbackWithRequest } from 'passport-jwt';

const adminCookieAuthStrategy = new Strategy(
    {
        jwtFromRequest: req => {
            let jwt: null | string = null;
            if (req && req.cookies) {
                jwt = req.cookies.token;
            }
            return jwt;
        },
        algorithms: ['HS256'],
        passReqToCallback: true,
        secretOrKey: process.env.ADMIN_JWT_SECRET!,
    },
    (async (req, payload, done) => {
        
    }) as VerifyCallbackWithRequest,
);

passport.use('admin', adminCookieAuthStrategy);
