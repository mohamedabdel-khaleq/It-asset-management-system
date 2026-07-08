const jwt = require("jsonwebtoken");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const authMiddleware = catchAsync(async (req, res, next) => {
  let token;

  // Check Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // No Token
  if (!token) {
    return next(new ApiError("Unauthorized. No token provided.", 401));
  }

  // Verify Token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Find User
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new ApiError("User not found.", 404));
  }

  // Check if User is Active
  if (!currentUser.isActive) {
    return next(new ApiError("Your account has been deactivated.", 403));
  }

  // Save User in Request
  req.user = currentUser;

  next();
});

module.exports = authMiddleware;