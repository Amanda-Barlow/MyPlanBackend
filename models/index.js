const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
const Plan = require('./plan')

mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = Plan