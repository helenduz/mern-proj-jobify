import express from 'express';
const jobRouter = express.Router();

import { createJob, deleteJob, getAllJobs, updateJob, showStats } from '../controllers/jobController.js'

jobRouter.route('/').post(createJob).get(getAllJobs);
jobRouter.route("/stats").get(showStats);
// this route is placed at last because it matches string in path
jobRouter.route('/:id').delete(deleteJob).patch(updateJob);

export default jobRouter;
