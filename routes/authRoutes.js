import express from 'express';
import authenticateUser from '../middleware/authenticateUser.js'

const authRouter = express.Router();

import { register, login, updateUser } from '../controllers/authController.js'

authRouter.route('/register').post(register);
authRouter.route('/login').post(login);
authRouter.route('/updateUser').patch(authenticateUser, updateUser);

export default authRouter;
