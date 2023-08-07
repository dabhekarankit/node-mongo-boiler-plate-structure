import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import UserController from "./user.controller";
import validator from "../../common/helpers/validator.helper";
import registerDto from "./dtos/register.dto";
import loginDto from "./dtos/login.dto";
import authenticateMiddleware from "../../common/middleware/authenticate.middleware";

const router = Router();

router
    .post("/register", validator.body(registerDto), expressAsyncHandler(UserController.register))
    .post("/login", validator.body(loginDto), expressAsyncHandler(UserController.login))
    .get("/:userId", authenticateMiddleware, expressAsyncHandler(UserController.details));

export default router;
