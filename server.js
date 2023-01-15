import express from 'express';
const app = express();

import * as dotenv from 'dotenv';
dotenv.config()

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

app.listen(port, () => {console.log(`Hello there! I'm running on port ${port}!`)});