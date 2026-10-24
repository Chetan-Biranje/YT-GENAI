const express = require("express");
const authRoutes = require("./routes/auth.routes");
connst authMiddleware = require("./middlewares/auth.middlewares");


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

/**
 * @route GET /api/auth/logout
 * @description clear token from the cookie and add it to the blacklist
 * @access Public
 */
authRouter.get("/api/logout", authRoutes.logoutUserController);
 
/**
 * @route GET /api/auth/get-me
 * @description Get the current logged in user details
 * @access Private
 */
authRouter.get("/api/get-me", authMiddleware.authuser, authRoutes.getMeController);


module.exports = authRouter;
