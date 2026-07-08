const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");


// Register
const register = catchAsync(async (req, res, next) => {

  console.log("REGISTER CONTROLLER WORKING");
  console.log(typeof next);

  const {
    username,
    email,
    password,
    role,
  } = req.body;

  console.log("BODY:", req.body);


  if (!username || !email || !password) {
    console.log("VALIDATION ERROR");
    return next(
      new ApiError(
        "Username, email and password are required",
        400
      )
    );
  }


  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  });

  console.log("CHECK USER DONE");


  if (existingUser) {
    console.log("USER EXISTS");
    return next(
      new ApiError(
        "Email already exists",
        400
      )
    );
  }


  const profileImage = req.file ? req.file.filename : "";

  console.log("BEFORE CREATE");


  const user = await User.create({
    username,
    email: email.toLowerCase(),
    password,
    role,
    profileImage,
  });


  console.log("USER CREATED");


  const token = generateToken(user._id);

  console.log("TOKEN CREATED");


  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    data: user,
  });

});


// Login
const login = catchAsync(async (req, res, next) => {

  const {
    email,
    password,
  } = req.body;


  // Validation
  if (!email || !password) {
    return next(
      new ApiError(
        "Email and password are required",
        400
      )
    );
  }


  // Find User With Password
  const user = await User.findOne({
    email: email.toLowerCase(),
  }).select("+password");


  if (!user) {
    return next(
      new ApiError(
        "Invalid email or password",
        401
      )
    );
  }


  // Compare Password
  const isMatch = await user.comparePassword(password);


  if (!isMatch) {
    return next(
      new ApiError(
        "Invalid email or password",
        401
      )
    );
  }


  // Update Last Login
  user.lastLogin = new Date();

  await user.save({
    validateBeforeSave: false,
  });


  const token = generateToken(user._id);


  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    data: user,
  });

});



module.exports = {
  register,
  login,
};