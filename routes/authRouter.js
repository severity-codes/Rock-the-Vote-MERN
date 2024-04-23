const express = require("express");
const User = require("../models/User");
const SECRET = require("jsonwebtoken");
const authRouter = express.Router();

// Constants for better readability and maintainability
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_FORBIDDEN = 403;
const HTTP_STATUS_UNAUTHORIZED = 401;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
const ERROR_MESSAGE_USER_EXISTS = "This username already exists";
const ERROR_MESSAGE_INCORRECT_CREDENTIALS = "Username or Password are incorrect";
const ERROR_MESSAGE_UNEXPECTED_ERROR = "An unexpected error occurred";

// Helper function to generate JWT token
const generateToken = (user) => {
  const userData = user.withoutPassword(); // Assuming this method removes password from the user object
  return SECRET.sign(userData, process.env.SECRET);
};

// Signup route
authRouter.post("/signup", async (req, res, next) => {
  try {
    const username = req.body.username.toLowerCase();
    // Add explicit validation/sanitization for req.body here
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(HTTP_STATUS_FORBIDDEN).json({ message: ERROR_MESSAGE_USER_EXISTS });
    }
    const newUser = new User(req.body); // Consider adding explicit validation here
    const savedUser = await newUser.save();
    const token = generateToken(savedUser);
    res.status(HTTP_STATUS_OK).json({ token, user: savedUser.withoutPassword() });
  } catch (err) {
    res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGE_UNEXPECTED_ERROR });
    next(err);
  }
});

// Login route
authRouter.post("/login", async (req, res, next) => {
  try {
    const username = req.body.username.toLowerCase();
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(HTTP_STATUS_UNAUTHORIZED)
        .json({ message: ERROR_MESSAGE_INCORRECT_CREDENTIALS });
    }
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
      return res
        .status(HTTP_STATUS_UNAUTHORIZED)
        .json({ message: ERROR_MESSAGE_INCORRECT_CREDENTIALS });
    }
    const token = generateToken(user);
    res.status(HTTP_STATUS_OK).json({ token, user: user.withoutPassword() });
  } catch (err) {
    res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGE_UNEXPECTED_ERROR });
    next(err);
  }
});

module.exports = authRouter;