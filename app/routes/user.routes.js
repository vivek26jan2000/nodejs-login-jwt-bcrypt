const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const express = require("express");

const router = express.Router();

// get public content
router.get("/all", controller.allAccess);

// get user data
router.get("/user", [authJwt.verifyToken], controller.userBoard);

// get modertor data
router.get(
  "/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  controller.moderatorBoard
);

// get admin data
router.get(
  "/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);

module.exports = router;
