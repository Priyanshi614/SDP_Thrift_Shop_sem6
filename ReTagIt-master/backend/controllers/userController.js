const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/userModel")

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, mobile, password} = req.body

    if(!name || !email || !password || !mobile) {
       return res.status(400).json({message: "please include all fields"})
    }

    // find if already exist
    const UserExist = await User.findOne({email})

    if(UserExist) {
        res.status(400)
        throw new Error("User already exist")
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name,
        email,
        mobile,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }

})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    console.log(user);

    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            token: generateToken(user._id)
        })
        
    } else {
        res.status(401)
        throw new Error("invalid credentials")
    }

})

const getMe = asyncHandler(async (req, res) => {
    const user = {
        // id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user)
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}