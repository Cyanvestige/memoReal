import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import contentRoutes from "./routes/contents.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

// const CONNECTION_URL =
//     "mongodb+srv://cyanvestige:Xiaowei123@cluster0.omarc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.use("/contents", contentRoutes);
app.use("/user", userRoutes);

mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    )
    .catch((error) => console.log(error.message));
