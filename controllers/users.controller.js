import User from "../models/user.model.js";
import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { httpStatus } from "../utils/httpStatusText.js";

const getAllUser = asyncWrapper(async (req, res, next) => {
  const limit = req.query.limit || 5;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find().limit(limit).skip(skip);
  res.status(200).json({ status: httpStatus.SUCCESS, data: { users } });
});

export { getAllUser };
