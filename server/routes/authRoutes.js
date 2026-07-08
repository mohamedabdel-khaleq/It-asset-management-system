
const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");
const upload = require("../config/multer");

router.post(
  "/register",
  upload("users").single("profileImage"),
  AuthController.register
);

router.post(
  "/login",
  AuthController.login
);

module.exports = router;
