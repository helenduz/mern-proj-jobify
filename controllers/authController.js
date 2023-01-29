// Controller functions used in authRoutes.js

import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/controller-errors.js";

// note: async error handling done by express-async-error, express will automatically catch error like in sync code
const register = async (req, res) => {
    // check for empty fields
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError("Server Controller Checks: please provide all values!");
    }

    // check for duplicate email
    const userAlreadyExist = await User.findOne({ email: email });
    if (userAlreadyExist) {
        throw new BadRequestError("Server Controller Checks: this email is already in use!");
    }

    // send response with token
    const user = await User.create(req.body);
    const userJWT = user.createJWT();
    // excludes password in the response to client
    res.status(StatusCodes.CREATED).json({ user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
    }, token: userJWT });
};

const login = async (req, res) => {
    // check for empty fields
    const { email, password } = req.body;
    if ( !email || !password) {
        throw new BadRequestError("Server Controller Checks: please provide all values!");
    }

    // check for user existence
    const user = await User.findOne({ email: email }).select('+password'); // adding the pw field as well for checking below
    if (!user) {
        throw new UnauthenticatedError("Server Controller Checks: no user with this email exists!");
    }

    // check for correct password
    const pwCorrect = await user.checkPassword(password);
    if (!pwCorrect) {
        throw new UnauthenticatedError("Server Controller Checks: password is incorrect!");
    }

    // send response with token
    const userJWT = user.createJWT();
    // excludes password in the response to client
    res.status(StatusCodes.OK).json({ user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
    }, token: userJWT });

};

const updateUser = (req, res) => {
    res.send("updateUser");
};

export { register, login, updateUser };