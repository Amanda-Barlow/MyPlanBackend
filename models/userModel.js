const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type: String, 
        required: [true, 'Please add an email'], 
        unique: true},
    password:{
        type: String, 
        required: [true, 'Please add a password'],
        unique: false,
    },
},  {
        timestamps: true
    },
);


const User = mongoose.model ('User', userSchema)
module.exports = User