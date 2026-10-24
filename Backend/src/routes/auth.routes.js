const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
authRouter.post("/login", authController.loginUserController);

/**
 * @route POST /api/auth/logout
 * @description Clear the token cookie and add the token to the blacklist
 * @access Private
 */
authRouter.post(
  "/logout",
  authMiddleware.authuser,
  authController.logoutUserController
);

/**
 * @route GET /api/auth/get-me
 * @description Get the current logged-in user details
 * @access Private
 */
authRouter.get(
  "/get-me",
  authMiddleware.authuser,
  authController.getMeController
);

module.exports = authRouter;
