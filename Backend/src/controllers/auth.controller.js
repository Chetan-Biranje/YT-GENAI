const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklist.model");


/**
 * @name registerUserController
 * @description Register a new user, expects username, email, and password in the request body.
 * @access Public
 */
async function registerUserController(req, res) { 

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email, and password"

        })
    }
    
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{username},{email}]
    })

    if(isUserAlreadyExists) {

        return res.status(400).json({
            message: "Account already exists with this email address or username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id, Username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    )

    res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" })

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * @name loginUserController
 * @description Login a user, expects email and password in the request body.
 * @access Public
 */
async function loginUserController(req, res) {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password"
        })
    }

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" })

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * 
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access Private
 */

async function logoutUserController(req, res) {
    const token = req.token || req.cookies?.token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    const existingToken = await blacklistTokenModel.findOne({ token })

    if (!existingToken) {
        await blacklistTokenModel.create({ token })
    }

    res.clearCookie("token", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" })

    return res.status(200).json({
        message: "User logged out successfully"
    })
}

/**
 * @name getMeController
 * @description Get the current logged in user details
 * @access Private 
 */
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    return res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}