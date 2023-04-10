// Controller functions used in jobRoutes.js

import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/controller-errors.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

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
    // getting query string params
    const { searchField, status, jobType, sort } = req.query;
    if (!status || !jobType || !sort) {
        throw new BadRequestError(
            "Server Controller Checks: required fields: status, jobType, and sort"
        );
    }

    // build query object based on query string param
    let queryObject = { createdBy: req.user.userId };
    if (status !== "all") {
        queryObject.status = status;
    }
    if (jobType !== "all") {
        queryObject.jobType = jobType;
    }
    if (searchField) {
        queryObject = {
            ...queryObject,
            $or: [
                // for each of the 3 fields below,
                // match anything in the searchField string
                // option "i" means case-insensitive
                { position: { $regex: searchField, $options: "i" } },
                { company: { $regex: searchField, $options: "i" } },
                { jobLocation: { $regex: searchField, $options: "i" } },
            ],
        };
    }

    // no await to let it return a query
    let result = Job.find(queryObject);

    // chain sorting conditions
    if (sort === "latest") {
        result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
        result = result.sort("createdAt");
    }
    if (sort === "company (A-Z)") {
        result = result.sort("company");
    }

    if (sort === "company (Z-A)") {
        result = result.sort("-company");
    }

    // limit and skip for pagination (returning only jobs for that page)
    const page = Number(req.query.page) || 1;
    const numJobsPerPage = Number(req.query.numJobsPerPage) || 10;
    const numToSkip = (page - 1) * numJobsPerPage;
    result = result.skip(numToSkip).limit(numJobsPerPage);

    // get result (after filter, sort, skip, and limit)
    const jobs = await result;

    // calculate totalJobs and numPages
    const totalJobs = await Job.countDocuments(queryObject);
    const numPages = Math.ceil(totalJobs / numJobsPerPage);

    res.status(StatusCodes.OK).json({
        jobs,
        totalJobs: totalJobs,
        numPages: numPages,
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

    let monthlyApplications = await Job.aggregate([
        // filter jobs by userId
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        // group by {year, month} combination
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                count: { $sum: 1 },
            },
        },
        // sort first by year then by month, descending
        // notice that fields we sort on are fields from output of previous stage
        { $sort: { "_id.year": -1, "_id.month": -1 } },
        { $limit: 6 }, // getting latest 6 months
    ]);

    // format monthlyApplications such that each item is { date: “nicelyFormattedDateString”, count: X }
    monthlyApplications = monthlyApplications
        .map((item) => {
            const {
                _id: { month, year },
                count,
            } = item;
            // moment.js month is from 0 to 11 while it is from 1 to 12 from mongoDB $month operator
            const date = moment()
                .month(month - 1)
                .year(year)
                .format("MMM Y");
            return { date, count };
        })
        .reverse(); // start from earliest month instead

    res.status(StatusCodes.OK).json({
        stats: defaultStats,
        monthlyApplications,
    });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };