import * as dotenv from "dotenv";
dotenv.config();

import { readFile } from "fs/promises";
import connectDB from "../db/connect.js";
import Job from "../models/Job.js";

const start = async () => {
  try {
      // connect to DB
      await connectDB(process.env.MONGO_URI);
      // // delete existing jobs
      // await Job.deleteMany();
      // create jobs with mock data
      const mockJobsJSON = JSON.parse(
          await readFile(new URL("./mock_data.json", import.meta.url))
      );
      await Job.create(mockJobsJSON);
      // end the program
      console.log("Success!");
      process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

start();
