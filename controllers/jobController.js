// Controller functions used in jobRoutes.js

import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/controller-errors.js";
import checkPermissions from "../utils/checkPermissions.js";

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

const getAllJobs = async (req, res) => {
    // find all jobs created by user
    const jobs = await Job.find({ createdBy: req.user.userId });

    res.status(StatusCodes.OK).json({
        jobs,
        totalJobs: jobs.length,
        numPages: 1,
    });
};

const updateJob = async (req, res) => {
    // get ID from req.params
    const { id:jobId } = req.params;
    const { company, position } = req.body;

    // check for company/position existence (echo front-end checks)
    if (!company || !position) {
        throw new BadRequestError("Server Controller Checks: please provide all values!");
    } 

    // deal with job not found
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
        throw new NotFoundError(`Server Controller Checks: Job with ID ${jobId} cannot be found in database`);
    }

    // check for whether user can access this job
    checkPermissions(req.user, job.createdBy);

    // findOneAndUpdate
    // 1st arg is filter; 2nd is fields to update; 3rd is options
    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(StatusCodes.OK).json(updatedJob);
};

const deleteJob = async (req, res) => {
    const { id:jobId } = req.params;
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
        throw new NotFoundError(`Server Controller Checks: Job with ID ${jobId} cannot be found in database`);
    }
    checkPermissions(req.user, job.createdBy);
    await job.remove();
    res.status(StatusCodes.OK).json({ msg: `Job ${jobId} removed!` });
};

const showStats = (req, res) => {
    res.send("showStats");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };