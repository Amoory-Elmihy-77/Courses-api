import express from "express";
import { getAllUser } from "../controllers/users.controller.js";
import { register, login } from "../auth/users.auth.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/").get(verifyToken, getAllUser);
router.route("/register").post(register);
router.route("/login").post(login);

export default router;
