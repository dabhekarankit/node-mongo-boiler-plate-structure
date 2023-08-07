import { decode } from "jsonwebtoken";
import User from "./user.model";
import accessTokensService from "../access-tokens/access-tokens.service";
import refreshTokensService from "../refresh-tokens/refresh-tokens.service";
import moment from "moment";

class UserService {
    /** find one by query */
    static async findOneByQuery(where, sort = { id: -1 }) {
        return await User.findOne(where).sort(sort).lean();
    }

    /** find many by query */
    static async findManyByQuery(where, sort = { id: -1 }) {
        return await User.find(where).sort(sort).lean();
    }

    /** Generate access token & refresh token */
    static async generateTokenPairs(userId, email) {
        const accessToken = await accessTokensService.createToken(userId, email);

        const decodedToken = decode(accessToken);

        const refreshToken = await refreshTokensService.createToken(
            decodedToken.jti,
            decodedToken.exp
        );

        return {
            accessToken,
            refreshToken,
            expireAt: moment.unix(decodedToken.exp).format(),
        };
    }

    /** store */
    static async store(body) {
        return await User.create(body);
    }

    /** update */
    static async update(where, body) {
        return await User.updateMany(where, body);
    }
}

export default UserService;
