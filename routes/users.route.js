import express from "express";
import { getAllUser } from "../controllers/users.controller.js";

const router = express.Router();

router.route("/").get(getAllUser);

export default router;
