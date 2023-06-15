const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
const Plan = require('./plan')
require ('dotenv').config()

mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

  module.exports = Plan