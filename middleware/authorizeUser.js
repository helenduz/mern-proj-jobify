import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/controller-errors.js";

const authorizeUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError("Auth Middleware: Invalid authorization header");
    } 
    const token = authHeader.split(" ")[1];

    // Verify signiture is valid
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Auth Middleware: Invalid token");
    }

    // Check if user is exists in database
};

export default authorizeUser;