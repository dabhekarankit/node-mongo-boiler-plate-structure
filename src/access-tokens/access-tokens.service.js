import jwt from "jsonwebtoken";
import moment from "moment";
import { randomBytes } from "crypto";
import AccessToken from "./access-token.model";
import mongoose from "mongoose";

class AccessTokensService {
    /** Generates access tokens */
    static async createToken(userId, email) {
        const accessToken = await AccessToken.create({
            user: userId,
            expiresAt: moment().add("365", "days").toDate(),
        });
        const jti = accessToken._id;

        const jwtToken = jwt.sign({ sub: userId, jti, email }, process.env.APP_KEY, { expiresIn: "365 days" });

        const decodedJwtToken = jwt.decode(jwtToken);

        console.log(decodedJwtToken);

        return jwtToken;
    }

    /** Find access token */
    static async findById(accessTokenId) {
        return await AccessToken.findOne({ _id: accessTokenId }).populate("user").lean();
    }

    /** delete access token */
    static async delete(query) {
        return await AccessToken.deleteMany(query);
    }
}

export default AccessTokensService;
