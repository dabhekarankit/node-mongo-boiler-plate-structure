import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accessTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    revoked: {
        type: Boolean,
        default: false,
    },
    expiresAt: Date,
});

const AccessToken = mongoose.model("access_tokens", accessTokenSchema);

export default AccessToken;
