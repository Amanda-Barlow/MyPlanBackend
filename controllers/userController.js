const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


//Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '90d',
    });
};
//AUTHENTICATE A USER
//POST /api/users/login
//Public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    
    //Check for user email
    //Check for user email
const user = await User.findOne({ email });

if (user && (await bcrypt.compare(password, user.password))) {
    res.redirect('/formRoutes'); //Redirect to home page when user is authenticated
} else {
    res.redirect('/forms')
    res.status(401).json({message: 'Invalid email or password'});
    throw new Error('Invalid email or password');
}

});
//REGISTER NEW USER
//POST /api/users
//Public
const registerUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        console.log('wrong email or password')
        res.status(400).json({ message: 'Please provide email and password' });
        throw new Error('Please provide email and password')
    }
    
    try {
      //Check if user exists
      const userExists = await User.findOne({ email });
    
      if (userExists) {
        return res.status(409).json({ message: 'User already exists' });
      }
    
      // rest of the code
    } catch (error) {
      console.error('Show error notification');
      return Promise.reject(error);
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User
    const user = await User.create({
        email,
        password: hashedPassword,
    });

    if(user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({message: 'Invalid User Data'});
        throw new Error('Invalid User data');
    }
});


//GET USER DATA
//GET /api/users/getUserData
//Private
const getUserData = asyncHandler(async(req, res) => {
    const {_id, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        email,
    })
})

module.exports = { 
    registerUser, 
    loginUser, 
    getUserData, 
}