import mongoose from "mongoose";

const connectDB = (uri) => {
    // note: mongoose connect returns a promise!
    return mongoose.connect(uri);
};

export default connectDB;