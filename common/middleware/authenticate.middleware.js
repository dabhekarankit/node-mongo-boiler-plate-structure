import passport from "passport";
import UnauthorizedException from "../exceptions/unauthorized.exception";
import ConflictRequestException from "../exceptions/conflict-request.exception";

export default async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (!user) {
            return next(new UnauthorizedException());
        }

        if (!user.verifiedAt) {
            return next(new ConflictRequestException("Email not vrified at."));
        }

        req.user = user;
        return next();
    })(req, res, next);
};
