const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{type: String, required: [true, 'Please add your name']},
    email:{type: String, required: [true, 'Please add an email'], unique: true},
    password:{type: String, required: [true, 'Please add a password']},
    id:{type: String}},
    {
        timestamps: true
    }
)


module.exports = mongoose.model('User', userSchema)