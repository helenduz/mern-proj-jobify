import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

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

UserSchema.pre('save', async function () {
    // note: bcrypt methods are async (recommended)
    const salt = await bcrypt.genSalt(10);
    // "this" points to the document where we called the method on
    this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("User", UserSchema);