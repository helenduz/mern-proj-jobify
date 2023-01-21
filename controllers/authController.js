// Controller functions used in authRoutes.js

import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

// note: async error handling done by express-async-error, express will automatically catch error like in sync code
const register = async (req, res) => {
    const user = await User.create(req.body);
    // if (!user) {
    //     throw new Error("Error in register controller");
    // }
    res.status(StatusCodes.CREATED).json(user);
};

const login = (req, res) => {
    res.send("login");
};

const updateUser = (req, res) => {
    res.send("updateUser");
};

export { register, login, updateUser };