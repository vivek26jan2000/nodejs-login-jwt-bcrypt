const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError.js");
const db = require("../models");
const User = db.user;

verifyToken = catchAsync(async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return next(new AppError("No token provided!", 403));
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return next(new AppError("Unauthorized!", 401));
    }
    req.userId = decoded.id;
    next();
  });
});

isAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.userId);

  const roles = await user.getRoles();
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  next(new AppError("Require Admin Role!", 403));
});

isModerator = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.userId);

  const roles = await user.getRoles();
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }
  next(new AppError("Require Moderator Role!", 403));
});

isModeratorOrAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.userId);

  const roles = await user.getRoles();
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  next(new AppError("Require Moderator or Admin Role!", 403));
});

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
module.exports = authJwt;
