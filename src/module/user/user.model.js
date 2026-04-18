import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 30,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
    },
    fullName: {   
        type: String,
        maxlength: 50
    },
    bio: {
        type: String,
        maxlength: 150
    }
}, { timestamps: true });

schema.pre("save", async function(next) {
    if (!this.isModified("password")) return next;
    this.password = await bcrypt.hash(this.password, 10);
    next;
});

export default mongoose.model("User", schema);