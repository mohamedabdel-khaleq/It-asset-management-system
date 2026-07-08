
/*
const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        next();
    };
};

module.exports = roleMiddleware;
*/
const ApiError = require("../utils/ApiError");

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // Check Authentication
    if (!req.user) {
      return next(new ApiError("Authentication required.", 401));
    }

    // Check Authorization
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          "You are not authorized to access this resource.",
          403
        )
      );
    }

    next();
  };
};

module.exports = roleMiddleware;