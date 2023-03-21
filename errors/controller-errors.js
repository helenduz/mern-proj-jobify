import { StatusCodes } from "http-status-codes";

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.status_code = StatusCodes.BAD_REQUEST;
    };
};

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status_code = StatusCodes.NOT_FOUND;
    };
}

class UnauthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.status_code = StatusCodes.UNAUTHORIZED;
    };
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.status_code = StatusCodes.FORBIDDEN;
    };
}

export { BadRequestError, NotFoundError, UnauthenticatedError, ForbiddenError };