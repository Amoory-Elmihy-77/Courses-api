import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import userRouter from "./routes/users.route.js";
import courseRouter from "./routes/courses.route.js";
import { httpStatus } from "./utils/httpStatusText.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 4000;

// mongo connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected successfully!"))
  .catch((err) => {
    console.log("Error =>", err);
  });

// middlewares
app.use(cors());
app.use(express.json());

//////////////////
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);

//////////////////
// handle app error middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: error.statusText || "error",
    message: error.message,
    data: null,
    code: error.status || 500,
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: httpStatus.ERROR,
    message: "This resource is not available",
  });
});

app.listen(port, () => {
  console.log("listening on port:", port);
});
