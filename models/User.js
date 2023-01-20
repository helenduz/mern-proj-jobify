import mongoose from "mongoose";
import validator from "validator";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name!"],
        minlength: 1,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email!"],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email"
        },
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        minlength: 8,
    },
    lastName: {
        type: String,
        maxlength: 20,
        trim: true,
        default: "Last Name",
    },
    location: {
        type: String,
        maxlength: 20, 
        trim: true,
        default: "My City",
    },
});

export default mongoose.model("User", UserSchema);