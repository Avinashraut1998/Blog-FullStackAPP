import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { sendOtpEmail } from "../services/mailer.service.js";

const createUser = async (req, res) => {

    const {
        firstName,
        lastName,
        email,
        password,
    } = req.body;
    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        };

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        };

        const user = await User.create({
            firstName,
            lastName,
            email,
            password
        });

        user.password = '';

        res.status(201).json({ user, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        };

        const user = await User.findOne({ email });

        if (!user) res.status(404).json({ error: "User in not registered" })

        const isPasswordCorrect = await user.checkPassword(password);

        if (!isPasswordCorrect) res.status(401).json({ error: "Invalid credentials" });

        let accessToken = await user.createAccessToken();
        let refreshToken = await user.createRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        const options = {
            httpOnly: true,
            secure: true,
            // maxAge: 24 * 60 * 60 * 1000
        }
        user.password = '';
        user.refreshToken = '';
        res.status(200)
        .cookie('refreshToken', refreshToken, options)
        .json({
            body: {
                user,
                accessToken
            },
            message: "User logged in successfully"
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserDetails = async (req, res) => {
    return res.status(200).json({ user: req.user, message: "User details fetched successfully" });
}

const logoutUser = async (req, res) => {
    const userId = req.user._id;
    try {
        const options = { httpOnly: true, secure: true }
        await User.findOneAndUpdate({ _id: userId }, { $set: { refreshToken: null } });
        return res.status(200)
            .clearCookie('refreshToken', options)
            .json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken  = req.cookies.refreshToken;

    if(!incomingRefreshToken) return res.status(401).json({ error: "Unauthorized Request" });
    try {

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findOne({ _id: decodedToken._id });

        if (!user || user.refreshToken !== incomingRefreshToken) {
            return res.status(401).json({ error: "Invalid or expired refresh token" });
          }

          
        if( user.refreshToken !== incomingRefreshToken) return res.status(401).json({ error: "Refresh token is expired or used" });
    
        const newRefreshToken = await user.createRefreshToken();
        const newAccessToken = await user.createAccessToken();

        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });

        const options = {
            httpOnly: true,
            secure: true,
            // maxAge: 24 * 60 * 60 * 1000
        }
        res.cookie('refreshToken', newRefreshToken, options);
        res.status(200).json(
            { body: { 'accessToken': newAccessToken },
             message: 'Access token created successfully'
            });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const forgetPassword = async ( req, res ) => {
 const { email } = req.body;

 if(!email) return res.status(400).json({ error: "Email is required" });

  try {
    const existingUser = await User.findOne({ email });

    if(!existingUser) return res.status(404).json({ error: "User not found" });

    const otp = await existingUser.createResetPasswordToken();
    
    await existingUser.save({ validateBeforeSave: false });
    
    sendOtpEmail('Demo App <demo@demomailtrap.co>',existingUser.email, ' reset password', otp)

    res.status(200)
    .json({body: {
        otp : otp
    }, message: "OTP sent successfully"});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) return res.status(400).json({ error: "All fields are required" });

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ error: "User not found" });

        console.log(existingUser, otp)
        const isOptValid = existingUser.resetOtp !== otp;

        if (isOptValid) return res.status(400).json({ error: "Invalid OTP" });

        const isOptExpired = existingUser.resetOtpExpiry < Date.now();

        if (isOptExpired) return res.status(400).json({ error: "OTP is expired" });

        existingUser.password = newPassword;
        existingUser.resetOtp = null;
        existingUser.resetOtpExpiry = null;

        await existingUser.save({ validateBeforeSave: false });

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export { createUser, loginUser, getUserDetails,logoutUser ,refreshAccessToken,forgetPassword,resetPassword};