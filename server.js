import express from 'express';
const app = express();

import * as dotenv from 'dotenv';
dotenv.config()

import connectDB from './db/connect.js';

import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';

app.get('/', (req, res) => {
    // throw new Error('This is the message that prints to the console');
    res.send('Welcome!');
});

app.use(notFoundMiddleware);
// if a error handling function (i.e. 4 args) is placed last then all errors thrown in request handling process will be sent to that middleware fn (?)
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