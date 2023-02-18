import express from 'express';
import authorizeUser from '../middleware/authorizeUser.js'

const authRouter = express.Router();

import { register, login, updateUser } from '../controllers/authController.js'

authRouter.route('/register').post(register);
authRouter.route('/login').post(login);
authRouter.route('/updateUser').patch(authorizeUser, updateUser);

export default authRouter;
