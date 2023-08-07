import "dotenv/config";
import express from "express";
import { serve, setup } from "swagger-ui-express";
import path from "path";
import YAML from "yamljs";

const router = express.Router();
const superAdminSwaggerDocument = YAML.load(path.join(__dirname, "../../swagger.yml"));

router.use(
    "/documentation",
    (req, res, next) => {
        superAdminSwaggerDocument.info.title = `${process.env.APP_NAME}`;
        superAdminSwaggerDocument.info.version = "1.0";
        superAdminSwaggerDocument.servers = [
            {
                url: `${process.env.APP_URL}/api`,
                description: "API Local URL",
            },
        ];
        req.swaggerDoc = superAdminSwaggerDocument;
        next();
    },
    serve,
    setup(superAdminSwaggerDocument, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    })
);

export default router;
