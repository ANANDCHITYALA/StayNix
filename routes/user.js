const express = require("express");
const router = express.Router();

const passport = require("passport");
const wrapAsync = require("../utils/AsyncWrap");
const userController = require("../controllers/user");

// Signup Page
router.get("/signup", userController.renderSignup);

// Signup
router.post("/signup", wrapAsync(userController.signup));

// Login Page
router.get("/login", userController.renderLogin);

// Login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login,
);

// Logout
router.get("/logout", userController.logout);

module.exports = router;
