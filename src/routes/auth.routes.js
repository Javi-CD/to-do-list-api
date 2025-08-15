const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

/**
 * @route   Post/api/Auth/Register
 * @desc    Register new user
 * @access  Public
 * @body    {name, email, password}
 */
router.post("/register", register);

/**
 * @route   Post/api/Auth/Login
 * @desc    Login user
 * @access  Public
 * @body    {email, password}
 */
router.post("/login", login);

/**
 * @route  Get/api/auth/profile
 * @desc    Obtain authenticated user profile
 * @access  Private
 */
router.get("/profile", authenticateToken, getProfile);

module.exports = router;
