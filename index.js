import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "./routes/users.route.js";

const app = express();
const port = process.env.PORT || 4000;

// mongo connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected successfully!"));

// middlewares
app.use(express.json());

//////////////////
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log("listening on port:", port);
});
