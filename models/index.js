const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
const Form = require('./form')

mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

module.exports = {
    Form,
}