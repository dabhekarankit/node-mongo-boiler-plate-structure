import { compareString, encodeString } from "../../common/helpers/bcrypt.helper";
import ConflictRequestException from "../../common/exceptions/conflict-request.exception";
import UserService from "./user.service";
import NotFoundException from "../../common/exceptions/not-found.exception";

class UserController {
    /** register */
    static async register(req, res) {
        req.body.email = req.body.email.toLowerCase();
        let user = await UserService.findOneByQuery({
            email: req.body.email,
        });
        if (user) {
            throw new ConflictRequestException(
                "This email is already register with us. Please try to login."
            );
        }

        req.body.password = encodeString(req.body.password);
        user = await UserService.store(req.body);

        delete user.password;

        return res.json({
            error: false,
            message: "Register successfully.",
            data: {
                ...user,
                auth: await UserService.generateTokenPairs(user._id, user.email),
            },
        });
    }

    /** login */
    static async login(req, res) {
        req.body.email = req.body.email.toLowerCase();

        let user = await UserService.findOneByQuery({
            email: req.body.email,
        });

        if (!user) {
            throw new ConflictRequestException("This email is not registered with us.");
        }

        if (!compareString(req.body.password, user.password)) {
            throw new ConflictRequestException("Wrong password.");
        }

        delete user.password;

        return res.json({
            error: false,
            message: "User login successfully.",
            data: {
                ...user,
                auth: await UserService.generateTokenPairs(user._id, user.email),
            },
        });
    }

    /** details */
    static async details(req, res) {
        const user = await UserService.findOneByQuery({
            _id: req.params.userId,
        });

        if (!user) {
            throw new NotFoundException("User not found.");
        }

        delete user.password;

        return res.json({
            error: false,
            message: "User detail load successfully.",
            data: user,
        });
    }
}

export default UserController;
