import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connecDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `dbconnected successfully !! DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("database connection failed" + error);
    process.exit(1);
    throw error;
  }
};

export default connecDB;
