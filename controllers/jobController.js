// Controller functions used in jobRoutes.js

import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/controller-errors.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";

const createJob = async (req, res) => {
    // check for empty fields (that are required and don't have default values)
    const { position, company } = req.body;
    if (!position || !company) {
        throw new BadRequestError(
            "Server Controller Checks: please provide all values!"
        );
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
    const { id: jobId } = req.params;
    const { company, position } = req.body;

    // check for company/position existence (echo front-end checks)
    if (!company || !position) {
        throw new BadRequestError(
            "Server Controller Checks: please provide all values!"
        );
    }

    // deal with job not found
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
        throw new NotFoundError(
            `Server Controller Checks: Job with ID ${jobId} cannot be found in database`
        );
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
    const { id: jobId } = req.params;
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
        throw new NotFoundError(
            `Server Controller Checks: Job with ID ${jobId} cannot be found in database`
        );
    }
    checkPermissions(req.user, job.createdBy);
    await job.remove();
    res.status(StatusCodes.OK).json({ msg: `Job ${jobId} removed!` });
};

const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        // filter jobs by userId
        // we need to convert useId (string) to mongoose ObjectId
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        // group by status field ("_id" is the grouping key), accumulator function is $sum and operand of sum is 1, and the accumulation result is stored as a field called "count" in the output
        { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // reduce to object { statusType: count }
    stats = stats.reduce((accumulator, currentValue) => {
        const { _id, count } = currentValue;
        accumulator[_id] = count;
        return accumulator;
    }, {});

    // default count to 0 if statusType does not exist
    const statusArr = Job.schema.path("status").enumValues;
    let defaultStats = {};
    statusArr.forEach((statusType) => {
        defaultStats[statusType] = stats[statusType] || 0;
    });
    res.status(StatusCodes.OK).json(defaultStats);
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };