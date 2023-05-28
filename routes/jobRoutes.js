import express from 'express';
const jobRouter = express.Router();

import { createJob, deleteJob, getAllJobs, updateJob, showStats } from '../controllers/jobController.js'
import checkDemoUser from "../middleware/checkDemoUser.js";

jobRouter.route("/").post(checkDemoUser, createJob).get(getAllJobs);
jobRouter.route("/stats").get(showStats);
// this route is placed at last because it matches string in path
jobRouter
    .route("/:id")
    .delete(checkDemoUser, deleteJob)
    .patch(checkDemoUser, updateJob);

export default jobRouter;
