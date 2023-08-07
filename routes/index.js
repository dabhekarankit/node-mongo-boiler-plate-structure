import { Router } from "express";
import userRoutes from "../src/users/user.router";
import swaggerHelper from "../common/helpers/swagger.helper";

const router = Router();

router
    .get("/", (req, res) => {
        res.send("Website...");
    })
    .use("/api/", swaggerHelper)
    .use("/api/v1/users", userRoutes);

export default router;
