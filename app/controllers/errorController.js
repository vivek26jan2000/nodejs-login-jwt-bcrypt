const APPError = require("../utils/appError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(error, err);
    res.status(500).json({
      status: "error",
      message: "something went wrong!",
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // error: err,
    // stack: err.stack,
  });

  // if (process.env.NODE_ENV === "development") {
  //   sendErrorDev(err, res);
  // } else if (process.env.NODE_ENV === "production") {
  //   sendErrorProd(err, res);
  // }
};
