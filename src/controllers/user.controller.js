import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  /* 
  steps:
  get the user details from front-end - we will use postman to test the api
  validation - not empty
  check if the user already exists 
  check for images
  check for avatar
  upload them to cloudinary - avatar
  create user object - create entry in db
  remove the password and refresh token from the response
  check for user creation
  return response
  */

  const { userName, fullName, email, password } = req.body;

  // check for empty fields
  if (
    [fullName, userName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists!");
  }

  let avatarLocalPath = req.files.avatar[0];
  let coverImageLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    return (coverImageLocalPath = req.files.coverImage[0]);
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Please provide an avatar!");
  }

  // upload to cloudinary
  const avatar = await cloudinaryUpload(avatarLocalPath);
  const coverImage = coverImageLocalPath
    ? await cloudinaryUpload(coverImageLocalPath)
    : "";

  console.log("avatar file", avatar);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required!");
  }

  // create user object
  const user = await User.create({
    fullName,
    userName: userName.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url ? coverImage.url : "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong!! Unable to create user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully!"));
});

export { registerUser };
