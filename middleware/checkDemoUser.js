import { BadRequestError } from "../errors/controller-errors.js";

const checkDemoUser = async (req, res, next) => {
    if (req.user.isDemoUser) {
        throw new BadRequestError("Demo User: Read Only!");
    }
    next();
};
export default checkDemoUser;
