import express from 'express';
const app = express();
import 'express-async-errors';

import * as dotenv from 'dotenv';
dotenv.config()

import morgan from 'morgan';
if (process.env.NODE_ENV !== 'production') {
   app.use(morgan('dev'));
}

// set up static assets path
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';

// app-level middlewares
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import authenticateUser from './middleware/authenticateUser.js';


// request handling chain
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);
if (process.env.NODE_ENV == "production") {
    // note: this assumes /client folder is in same dir as this file
    app.use(express.static(path.resolve(__dirname, "./client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
    });
} 
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// only spins up server if connection to DB is successful!
const start = async () => {
 try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {console.log(`Hello there! I'm running on port ${port}!`)});
 } catch (error) {
    console.log(error);
 }
};

start();