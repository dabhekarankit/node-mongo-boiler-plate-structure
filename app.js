import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as httpCreateServer } from "http";
import { createServer as httpsCreateServer } from "https";
import fs from "fs";
import fileUpload from "express-fileupload";
import session from "express-session";
import database from "./common/helpers/database.helper";
import "./common/helpers/passport.helper";
import errorHandlerMiddleware from "./common/middleware/error-handler.middleware";
import routes from "./routes";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: process.env.APP_KEY,
        resave: "false",
        saveUninitialized: "true",
    })
);
database();
app.use(routes);
app.use(errorHandlerMiddleware);

const isSecure = process.env.IS_SECURE === "true";
let server;
if (isSecure) {
    var options = {
        key: fs.readFileSync(process.env.SSL_CERT_BASE_PATH),
        cert: fs.readFileSync(process.env.SSL_CERT_BASE_PATH),
        ca: [
            fs.readFileSync(process.env.SSL_CERT_BASE_PATH),
            fs.readFileSync(process.env.SSL_CERT_BASE_PATH),
        ],
    };
    server = httpsCreateServer(options, app);
} else {
    server = httpCreateServer(app);
}

server.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.APP_URL}`);
});
