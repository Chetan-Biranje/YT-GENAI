const express = require("express");
const authRoutes = require("./routes/auth.routes");

const authRouter =Router();


/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", registerUserController);


module.exports =app