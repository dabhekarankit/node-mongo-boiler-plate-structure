import mongoose from "mongoose";

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    accessToken: {
        type: Schema.Types.ObjectId,
        ref: "access_tokens",
    },
    revoked: {
        type: Boolean,
        default: false,
    },
    expiresAt: Date,
});

const RefreshToken = mongoose.model("refresh_tokens", refreshTokenSchema);

export default RefreshToken;
