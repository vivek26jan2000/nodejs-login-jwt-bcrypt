const db = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError.js");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = catchAsync(async (req, res, next) => {
  // Username
  const userName = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (userName)
    return next(new AppError("Failed! Username is already in use!", 400));

  // Email
  const userEmail = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (userEmail)
    return next(new AppError("Failed! Email is already in use!", 400));

  next();
});

checkRolesExisted = catchAsync(async (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return next(
          new AppError(`Failed! Role does not exist:${req.body.roles[i]}`, 400)
        );
      }
    }
  }

  next();
});

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
