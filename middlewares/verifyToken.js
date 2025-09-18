import jwt from "jsonwebtoken";
import appError from "../utils/appError.js";
import { httpStatus } from "../utils/httpStatusText.js";

export const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) {
    const error = appError.create(401, httpStatus.ERROR, "token is required");
    return next(error);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = decoded;
    next();
  } catch (err) {
    const error = appError.create(401, httpStatus.ERROR, "invalid token");
    return next(error);
  }
};
