import express from "express";
import { getAllUser } from "../controllers/users.controller.js";
import { register, login } from "../auth/users.auth.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import multer from "multer";

const disStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "." + ext;
    cb(null, "user" + "-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];
  if (fileType === "image") {
    cb(null, true);
  } else {
    cb(appError.create(400, httpStatus.ERROR, "plz upload image"));
  }
};

const upload = multer({ storage: disStorage, fileFilter });

const router = express.Router();

router.route("/").get(verifyToken, getAllUser);
router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);

export default router;
