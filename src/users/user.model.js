import mongoose from "mongoose";
import { PROVIDER_TYPES } from "../../common/helpers/constants.helper";

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: String,
        email: String,
        number: String,
        password: String,
        verifiedAt: { type: Date, default: null },
    },
    { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
