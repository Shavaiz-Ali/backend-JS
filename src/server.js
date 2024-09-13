import express from "express";
import dotenv from "dotenv";
import connecDB from "./db/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

connecDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
