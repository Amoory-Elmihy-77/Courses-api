import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;

// mongo connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected successfully!"));

app.listen(port, () => {
  console.log("listening on port:", port);
});
