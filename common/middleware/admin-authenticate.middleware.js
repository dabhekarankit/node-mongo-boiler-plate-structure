import JWT from "jsonwebtoken";

export default async (req, res, next) => {
    if (!req.session.token) {
        return res.redirect("/admin/login");
    } else {
        JWT.verify(req.session.token, process.env.APP_KEY, function (err, decoded) {
            if (err) {
                return res.redirect("/admin/login");
            }
        });
    }
    next();
};
