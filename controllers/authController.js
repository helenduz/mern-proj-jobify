// Controller functions used in authRoutes.js

import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/controller-errors.js";
import attachCookies from "../utils/attachCookies.js";

// note: async error handling done by express-async-error, express will automatically catch error like in sync code
const register = async (req, res) => {
    // check for empty fields
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError("Please provide all values!");
    }

    // check for duplicate email
    const userAlreadyExist = await User.findOne({ email: email });
    if (userAlreadyExist) {
        throw new BadRequestError("This email is already in use!");
    }

    // send response with token
    const user = await User.create(req.body);
    const userJWT = user.createJWT();

    // send token as cookie
    attachCookies({ res, userJWT });

    // excludes password in the response to client
    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
        },
        token: userJWT,
    });
};

const login = async (req, res) => {
    // check for empty fields
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Please provide all values!");
    }

    // check for user existence
    const user = await User.findOne({ email: email }).select("+password"); // adding the pw field as well for checking below
    if (!user) {
        throw new UnauthenticatedError("No user with this email exists!");
    }

    // check for correct password
    const pwCorrect = await user.checkPassword(password);
    if (!pwCorrect) {
        throw new UnauthenticatedError("Password is incorrect!");
    }

    // send response with token
    const userJWT = user.createJWT();

    // send token as cookie
    attachCookies({ res, userJWT });

    // excludes password in the response to client
    res.status(StatusCodes.OK).json({
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
        },
        token: userJWT,
    });
};

const updateUser = async (req, res) => {
    const { name, email, lastName, location } = req.body;
    // Check all fields are provided
    if (!name || !email || !lastName || !location) {
        throw new BadRequestError("Please provide all values!");
    }

    // Find user document
    const user = await User.findOne({ _id: req.user.userId });

    // Update values and save
    user.name = name;
    user.email = email;
    user.lastName = lastName;
    user.location = location;
    await user.save();

    // Send back new user object & new token
    const userJWT = user.createJWT();

    // send token as cookie
    attachCookies({ res, userJWT });

    // excludes password in the response to client
    res.status(StatusCodes.OK).json({
        user: user,
        token: userJWT,
    });
};

export { register, login, updateUser };