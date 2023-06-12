const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
const Form = require('./form')

mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = Form