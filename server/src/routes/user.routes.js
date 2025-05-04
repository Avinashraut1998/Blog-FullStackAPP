
import express from "express";
import {createUser, getUserDetails, loginUser, logoutUser, refreshAccessToken} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create-user").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyToken,logoutUser);
router.route("/get-user-details").get(verifyToken ,getUserDetails);
router.route("/refresh-token").post(refreshAccessToken);



export default router;