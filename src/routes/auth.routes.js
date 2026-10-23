const express = require("express");
const authRoutes = require("./routes/auth.routes");

const authRouter =Router();


/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authRoutes.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
authRouter.post("/api/login", authRoutes.loginUserController);

module.exports = authRouter;
