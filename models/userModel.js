const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type: String, 
        required: [true, 'Please add an email'], 
        unique: [true, 'Email Exists']},
    password:{
        type: String, 
        required: [true, 'Please add a password'],
        unique: false,
    },
},

    {
        timestamps: true
    },
)


module.exports = mongoose.model.Users || ('Users', userSchema)