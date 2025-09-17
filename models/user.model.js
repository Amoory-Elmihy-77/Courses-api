import mongoose from "mongoose";
import validator from "validator";
import { userRole } from "../utils/userRole.js";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: [userRole.USER, userRole.ADMIN, userRole.MANAGER],
    default: userRole.USER,
  },
});

export default mongoose.model("User", userSchema);
