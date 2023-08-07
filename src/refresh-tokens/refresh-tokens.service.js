import moment from "moment";
import { encrypt } from "../../common/helpers/common.helper";

import RefreshToken from "./refresh-token.model";

class RefreshTokensService {
    /** Create refresh token */
    async createToken(jti, expiresAt) {
        const refreshToken = await RefreshToken.create({
            accessToken: jti,
            expiresAt: moment.unix(expiresAt).add("21", "days").toDate(),
        });

        return encrypt(refreshToken._id.toString());
    }

    /** delete refresh token */
    async delete(query) {
        return await RefreshToken.deleteMany(query);
    }
}

export default new RefreshTokensService();
