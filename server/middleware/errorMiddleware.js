const errorMiddleware = (err, req, res, next) => {

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";


  // Duplicate MongoDB Field Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    err.statusCode = 400;
    err.status = "fail";
    err.message = `${field} already exists`;
  }


  // Mongoose Validation Error
  if (err.name === "ValidationError") {

    err.statusCode = 400;
    err.status = "fail";

    err.message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }


  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {

    err.statusCode = 400;
    err.status = "fail";
    err.message = "Invalid ID format";
  }


  // JWT Error
  if (err.name === "JsonWebTokenError") {

    err.statusCode = 401;
    err.status = "fail";
    err.message = "Invalid token";
  }


  // JWT Expired Error
  if (err.name === "TokenExpiredError") {

    err.statusCode = 401;
    err.status = "fail";
    err.message = "Token expired. Please login again";
  }


  res.status(err.statusCode).json({

    success: false,

    status: err.status,

    message: err.message || "Something went wrong",

  });

};


module.exports = errorMiddleware;