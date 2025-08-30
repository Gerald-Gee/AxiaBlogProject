// routes/authRoutes.js
import { Router } from "express";
import { loginUser } from "../controllers/authApis/authControllers.js";

const authRouter = Router();

authRouter.post("/user/login", loginUser);

export default authRouter;
