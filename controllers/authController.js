// Controller functions used in authRoutes.js

import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/controller-errors.js";

// note: async error handling done by express-async-error, express will automatically catch error like in sync code
const register = async (req, res) => {
    // checking for empty fields
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError("Server Controller Checks: please provide all values!");
    }

    // check for duplicate email
    const userAlreadyExist = await User.findOne({ email: email });
    if (userAlreadyExist) {
        throw new BadRequestError("Server Controller Checks: this email is already in use!");
    }

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json(user);
};

const login = (req, res) => {
    res.send("login");
};

const updateUser = (req, res) => {
    res.send("updateUser");
};

export { register, login, updateUser };