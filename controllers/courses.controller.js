import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import Course from "../models/course.model.js";
import { httpStatus } from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";

export const getAllCourses = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  const limit = query.limit || 5;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.status(200).json({ status: httpStatus.SUCCESS, data: { courses } });
});

export const getSingleCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  if (!course) {
    const error = appError.create(404, httpStatus.FAIL, "course not found");
    return next(error);
  }
  return res.status(200).json({ status: httpStatus.SUCCESS, data: { course } });
});

export const createCourse = asyncWrapper(async (req, res, next) => {
  const nCourse = new Course(req.body);
  await nCourse.save();
  return res
    .status(201)
    .json({ status: httpStatus.SUCCESS, data: { course: nCourse } });
});

export const updateCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  await Course.findByIdAndUpdate(courseId, req.body);
  const updatedCourse = await Course.findById(courseId);
  if (!updatedCourse) {
    const error = appError.create(404, httpStatus.FAIL, "course not found");
    return next(error);
  }
  return res
    .status(200)
    .json({ status: httpStatus.SUCCESS, data: { course: updatedCourse } });
});

export const deleteCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  if (!course) {
    const error = appError.create(404, httpStatus.FAIL, "course not found");
    return next(error);
  }
  await Course.deleteOne({ _id: courseId });
  return res.status(200).json({ status: httpStatus.SUCCESS, data: null });
});
