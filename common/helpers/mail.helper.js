import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const transporter = nodemailer.createTransport({
    pool: true,
    host: process.env.MAIL_HOST,
    port: +process.env.MAIL_PORT,
    secure: process.env.MAIL_ENCRYPTION === "ssl",
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log("🔥 Mail Error:", error);
    } else {
        console.log(`✅ Mail credentials load successfully.`);
    }
});

export const sendMail = async (template, data) => {
    // console.log(data);
    // Render template
    const templatePath = path.join(`${__dirname}/../../views/emails/${template}`);
    const html = await ejs.renderFile(templatePath, data);

    const mailOptions = {
        from: process.env.MAIL_FROM_NAME,
        to: data.to,
        subject: data.subject,
        html,
    };

    // Send Mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("🔥 Mail Error:", error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
    });
};
