// Controller functions used in jobRoutes.js

import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/controller-errors.js";

const createJob = async (req, res) => {
    // check for empty fields (that are required and don't have default values)
    const { position, company } = req.body;
    if (!position || !company) {
        throw new BadRequestError("Server Controller Checks: please provide all values!");
    }

    // create new job instance with userID set to what's passed in from request
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);

    // send response with job info
    res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = (req, res) => {
    res.send("deleteJob");
};

const getAllJobs = (req, res) => {
    res.send("getAllJobs");
};

const updateJob = (req, res) => {
    res.send("updateJob");
};

const showStats = (req, res) => {
    res.send("showStats");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };