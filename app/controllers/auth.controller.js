const db = require("../models");
const config = require("../config/auth.config");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError.js");
const User = db.user;
const Role = db.role;
const Agent = db.agent_config;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = catchAsync(async (req, res, next) => {
  // Save User to Database

  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  if (req.body.roles) {
    const roles = await Role.findAll({
      where: {
        name: {
          [Op.or]: req.body.roles,
        },
      },
    });
    await user.setRoles(roles);
    res.send({ message: "User registered successfully!" });
  } else {
    // user role = 1
    await user.setRoles([1]);
    res.send({ message: "User registered successfully!" });
  }
});

exports.signin = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!user) return next(new AppError("User Not found.", 404));

  const passwordIsValid = await bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    return next(new AppError("Invalid Password!", 401));
  }

  const token = await jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400, // 24 hours
  });

  const authorities = [];

  const roles = await user.getRoles();
  for (let i = 0; i < roles.length; i++) {
    authorities.push("ROLE_" + roles[i].name.toUpperCase());
  }

  res.status(200).send({
    id: user.id,
    username: user.username,
    email: user.email,
    roles: authorities,
    accessToken: token,
  });
});

exports.addAgentConfig = catchAsync(async (req, res, next) => {
  // Save agent cofig to Database

  // Site Name        : __________
  // Site ID               : __________
  // Frequency        : __________
  // Username        : __________
  // Password         : __________
  // Database IP     : __________
  // Database Port : __________

  const agent_config = await Agent.create({
    username: req.body.username,
    siteName: req.body.siteName,
    siteID: req.body.siteID,
    frequency: req.body.frequency,
    databaseIP: req.body.databaseIP,
    databasePort: req.body.databasePort,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  res.status(201).json({
    status: "success",
    message: "Agent config registered successfully!",
    data: {
      agent_config,
    },
  });
});
