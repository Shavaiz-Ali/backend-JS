import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (localFilePath) => {
  try {
    if (!localFilePath || typeof localFilePath.path !== 'string') {
      throw new Error("Invalid file path");
    }
    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath.path, {
      resource_type: "auto",
    });

    //file has been uploaded successfully
    fs.unlinkSync(localFilePath.path);
    return response;
  } catch (error) {
    console.log("error in cloudinary upload", error);
    if (localFilePath && typeof localFilePath.path === 'string') {
      fs.unlinkSync(localFilePath.path); //remove the locally saved temp file as the upload got failed
    }
    return null;
  }
};

export { cloudinaryUpload };
