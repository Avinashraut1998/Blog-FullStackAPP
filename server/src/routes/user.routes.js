
import express from "express";
import {createUser, forgetPassword, getUserDetails, loginUser, logoutUser, refreshAccessToken, resetPassword} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create-user").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyToken,logoutUser);
router.route("/get-user-details").get(verifyToken ,getUserDetails);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").get(forgetPassword);
router.route("/reset-password").post(resetPassword);



export default router;