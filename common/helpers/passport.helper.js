import "dotenv/config";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import moment from "moment";
import accessTokensService from "../../src/access-tokens/access-tokens.service";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.APP_KEY,
};

passport.use(
    // JWT strategy for check login user
    new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            const accessToken = await accessTokensService.findById(jwtPayload.jti);
            if (!accessToken || moment.utc().unix() > jwtPayload.exp) {
                return done(null, false);
            }

            if (!accessToken.user) {
                return done(null, false);
            }

            delete accessToken.user.password;
            accessToken.user.jti = jwtPayload.jti;

            return done(null, accessToken.user);
        } catch (error) {
            return done(error, false);
        }
    })
);
