import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import userRouter from "./routes/users.route.js";
import { httpStatus } from "./utils/httpStatusText.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 4000;

// mongo connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected successfully!"));

// middlewares
app.use(express.json());
app.use(cors());

//////////////////
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRouter);

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
