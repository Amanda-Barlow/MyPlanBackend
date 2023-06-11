const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//REGISTER NEW USER
//POST /api.users
//Public
const registerUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        res.status(400)
        throw new Error('Please sign in')
    }

    //Check if user exists
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error ('User already exists')
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await User.create({
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User data')
    }
})
//AUTHENTICATE A USER
//POST /api/users/login
//Public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    
    //Check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})
//GET USER DATA
//GET /api/users/me
//Private
const getMe = asyncHandler(async(req, res) => {
    const {_id, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        email,
    })
})

//Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '90d',
    })
}

module.exports = { 
    registerUser, 
    loginUser, 
    getMe, 
}