import { asyncHandler } from "../utils/asyncHandler.js";



const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;
//   const user = await User.create({ name, email, password });
  res.status(201).json({
    success: true,
    message: "User created successfully",
    // user,
  });
});

export { registerUser };
