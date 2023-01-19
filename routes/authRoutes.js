import express from 'express';
const authRouter = express.Router();

import { register, login, updateUser } from '../controllers/authController.js'

authRouter.route('/login').post(register);
authRouter.route('/register').post(login);
authRouter.route('/updateUser').patch(updateUser);

export default authRouter;
