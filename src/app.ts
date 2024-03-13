import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
// import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { connectDB } from "./utils/features";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import { deserializeUser } from "./middleware/authMiddleWare";
import { globalErrorHandler } from "./middleware/error";

const app = express();
const secretKey = "asiudghalwkhew3;dhua;sdjhwa;ordhaw";

configDotenv({ path: "./.env" });

connectDB(process.env.DATABASE_URL!);

app.use(globalErrorHandler);
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(deserializeUser);
app.get("/", (req, res, next) => {
	res.send("working");
});
// app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

export default app;
