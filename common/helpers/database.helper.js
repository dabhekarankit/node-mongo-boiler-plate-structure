import mongoose from "mongoose";

export default async () => {
    mongoose.set("debug", process.env.DB_LOGS);
    return mongoose
        .connect(process.env.DB_URL || "mongodb://localhost:27017/GAuto_App", {
            useNewUrlParser: true,
            // useFindAndModify: false,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        })
        .then((response) => {
            console.log("Database connected successfully.");
        })
        .catch((err) => console.log("Database Error", err));
};
