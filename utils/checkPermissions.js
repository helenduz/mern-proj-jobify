import { ForbiddenError } from "../errors/controller-errors.js";

const checkPermissions = ( requestUser, resourceUserId) => {
    // we only check for Id in the requestUser object
    // but you can add more (like checking roles) if needed
    if (requestUser.userId === resourceUserId.toString()) return;
    throw new ForbiddenError("Server Controller Checks: No permission to access job!");
}

export default checkPermissions;