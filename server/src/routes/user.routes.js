
import express from "express";
import {createUser, getUserDetails, loginUser} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create-user").post(createUser);
router.route("/login").post(loginUser);
router.route("/get-user-details").get(verifyToken ,getUserDetails);



export default router;