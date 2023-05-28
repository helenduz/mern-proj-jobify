import express from 'express';
import authenticateUser from '../middleware/authenticateUser.js'

const authRouter = express.Router();

import { register, login, updateUser } from '../controllers/authController.js'
import rateLimiter from "express-rate-limit";
import checkDemoUser from "../middleware/checkDemoUser.js";

const authRoutesLimiter = rateLimiter({
    windowMs: 15 * 60 * 10000, // 15 mins
    max: 10,
    message: "API request rate limit exceeded, please wait and try again",
});

authRouter.route("/register").post(authRoutesLimiter, register);
authRouter.route("/login").post(authRoutesLimiter, login);
authRouter
    .route("/updateUser")
    .patch(authenticateUser, checkDemoUser, updateUser);

export default authRouter;
