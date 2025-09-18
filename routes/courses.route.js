import express from "express";
import {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courses.controller.js";
import { createCourseValidation } from "../middlewares/validation.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { allowedTo } from "../middlewares/allowedTo.js";
import { userRole } from "../utils/userRole.js";

const router = express.Router();

router
  .route("/")
  .get(getAllCourses)
  .post(
    verifyToken,
    allowedTo(userRole.ADMIN, userRole.MANAGER),
    createCourseValidation(),
    createCourse
  );

router
  .route("/:courseId")
  .get(getSingleCourse)
  .patch(verifyToken, allowedTo(userRole.ADMIN, userRole.MANAGER), updateCourse)
  .delete(
    verifyToken,
    allowedTo(userRole.ADMIN, userRole.MANAGER),
    deleteCourse
  );

export default router;
