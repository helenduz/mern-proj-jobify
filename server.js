import express from 'express';
const app = express();
import 'express-async-errors';

import * as dotenv from 'dotenv';
dotenv.config()

import morgan from 'morgan';
if (process.env.NODE_ENV !== 'production') {
   app.use(morgan('dev'));
}

import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';

// app-level middlewares
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import authorizeUser from './middleware/authorizeUser.js';


// request handling chain
app.use(express.json());
app.get('/api/v1', (req, res) => {
    // throw new Error('This is the message that prints to the console');
    res.json({ msg: 'Welcome!' });
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authorizeUser, jobRouter);
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