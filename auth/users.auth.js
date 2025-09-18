import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import bcrypt from "bcrypt";
import { httpStatus } from "../utils/httpStatusText.js";
import User from "../models/user.model.js";
import appError from "../utils/appError.js";

export const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = appError.create(
      400,
      httpStatus.ERROR,
      "email and password are required"
    );
    return next(error);
  }
  const user = await User.findOne({ email: email });
  if (!user)
    return next(appError.create(404, httpStatus.FAIL, "user not found"));
  const checkPassword = await bcrypt.compare(password, user.password);
  if (checkPassword) {
    return res.status(200).json({ msg: "login successfully" });
  } else {
    return next(
      appError.create(400, httpStatus.ERROR, "wrong email or password")
    );
  }
});

export const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: role.toUpperCase(),
  });
  await newUser.save();
  return res
    .status(201)
    .json({ status: httpStatus.SUCCESS, data: { user: newUser } });
});
