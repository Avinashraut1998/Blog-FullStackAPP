import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            lowercase: true,
            trim: true,
            // required: true,
        },
        address: {
            type: String,
            lowercase: true,
            trim: true,
        },
        city: {
            type: String,
            lowercase: true,
            trim: true,
        },
        state: {
            type: String,
            lowercase: true,
            trim: true,
        },
        country: {
            type: String
            , lowercase: true,
            trim: true,
        },
        pinCode: {
            type: String,
            lowercase: true,
            trim: true,
        },
        role: {
            type: String,
            trim: true,  // admin, user
            lowercase: true,
            default: "user",
        },
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id : this._id,
        email: this.email,
        firstName : this.firstName,
        lastName : this.lastName
    }, process.env.ACCESS_TOKEN_SECRET, 
    { expiresIn: '1d' }
);
}
export const User = mongoose.model("User", userSchema);

