import mongoose from "mongoose";
import validator from "validator";


const JobSchema = mongoose.Schema({
        company: {
            type: String,
            required: [true, "Please provide a company!"],
            minlength: 1,
            maxlength: 50,
            trim: true,
        },
        position: {
            type: String,
            required: [true, "Please provide a position!"],
            maxlength: 100,
            trim: true,
        },
        status: {
            type: String,
            enum: ['interviewing', 'declined', 'pending', 'accepted'],
            default: 'pending',
        },
        jobType: {
            type: String,
            enum: ['full-time', 'part-time', 'internship'],
            default: 'full-time',
        },
        jobLocation: {
            type: String,
            maxlength: 20, 
            trim: true,
            default: "My City",
            required: true,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User', // Type of model that can be assigned to createdBy
            required: [true, "Please provide a user!"]
        }
    }, 
    { timestamps: true }
);

export default mongoose.model("Job", JobSchema);