const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const express = require("express");

const router = express.Router();

// signup
router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  controller.signup
);

// sigin
router.post("/signin", controller.signin);

module.exports = router;
