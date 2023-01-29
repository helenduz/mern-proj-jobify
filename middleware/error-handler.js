import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    // Using status code and message in the error object if it contains it, otherwise default to 500 as code and the entire error as msg
    const defaultError = {
        statusCode: err.status_code || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message ? `Error Handler Checks: ${err.message}`: `Error Handler Checks: Unexpected Error: ${err}`,
    };

    // Validation Error (error object is passed up from Mongoose)
    if (err.name === "ValidationError") {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = `Error Handler Checks: ${Object.values(err.errors).map(item => item.message).join(", ")}`;
    }

    // Duplicate Key Error (error object is passed up from MongoDB) - will not be called anymore since we pre-checked in authController
    if (err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = `Error Handler Checks: ${Object.keys(err.keyValue)} already exists!`;
    }

    res.status(defaultError.statusCode).json({msg: defaultError.msg});
};

export default errorHandlerMiddleware;