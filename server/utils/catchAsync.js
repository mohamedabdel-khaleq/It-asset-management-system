const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.log("CATCH ASYNC ERROR:", err);
      next(err);
    });
  };
};

module.exports = catchAsync;