const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

module.exports = async (req, res, next) => { 
    try{
        //get the token from the authorization header
        const token = await req.headers.authorization.split('')[1];

        //check if the token matches the supposed origin
        const decodedToken = await jwt.verify(
            token,
            'RANDOM-TOKEN'
        );

        //retrieve the user details of the logged in user
        const user = await decodedToken;

        //pass the user down to the endpoints 
        request.user = user;

        //pass functionality to the endpoint
        next();
    
    } catch (error) {
        res.status(401).json({
            error: new Error('Invalid request!'),
        });
    } 

}

const protect = asyncHandler(async(req, res, next) => {
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
        //Get token from header
        token = req.headers.authorization.split(' ')[1]
        
        //Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //Get user from the token
        req.user = await User.findById(decoded.id).select('password')
        next()

        } catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
    if(!token){
        res.status(401) 
        throw new Error ('Not authorized, no token')
    }
})
 
module.exports = { protect }

