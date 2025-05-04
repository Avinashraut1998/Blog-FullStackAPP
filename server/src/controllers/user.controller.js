import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

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

export { createUser, loginUser, getUserDetails,logoutUser ,refreshAccessToken};