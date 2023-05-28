import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/controller-errors.js";

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError("Auth Middleware: Invalid authorization header");
    } 
    const token = authHeader.split(" ")[1];

    // Verify signiture is valid
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // check if user is demo user
        const isDemoUser = payload.userId === "646b78dc43c6c604a7d73e0a";
        // add fields to req object
        req.user = { userId: payload.userId, isDemoUser };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Auth Middleware: Invalid token");
    }

    // Check if user is exists in database
};

export default authenticateUser;