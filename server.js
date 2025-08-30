import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDb from "./connectDb/mongodb.js";

import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import allApis from "./routes/allApis.js";

import { startCleanUp, sendMailReminder } from "./cronJobs/startCleanUp.js";

dotenv.config();
connectDb();

const app = express();

// // Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Cron jobs
startCleanUp();
sendMailReminder();

// // Routes
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);
// app.use("/", allApis);

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
