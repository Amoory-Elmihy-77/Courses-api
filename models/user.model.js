import mongoose from "mongoose";
import validator from "validator";
import { userRole } from "../utils/userRole.js";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [userRole.USER, userRole.ADMIN, userRole.MANAGER],
    default: userRole.USER,
  },
  avatar: {
    type: String,
    default: "uploads/profile.jpeg",
  },
});

export default mongoose.model("User", userSchema);
