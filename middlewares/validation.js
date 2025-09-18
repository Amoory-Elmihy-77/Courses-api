import { body } from "express-validator";

const createCourseValidation = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("title must be at least 2 char"),
    body("price").notEmpty().withMessage("price is required"),
  ];
};

export { createCourseValidation };
