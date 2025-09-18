import appError from "../utils/appError.js";
import { httpStatus } from "../utils/httpStatusText.js";

export const allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      const error = appError.create(
        403,
        httpStatus.FAIL,
        "You are not allowed to perform this action"
      );
      return next(error);
    }
    next();
  };
};
