const express = require("express");
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')

const port = process.env.PORT || 4000;
const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

const app = express();
const routes = require('./routes/index')
const userRoute = require('./routes/userRoute')
const cors = require("cors");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/users', userRoute)
app.use('/api/form', require('./routes/formRoute'))

app.use(errorHandler)

//LISTENER
app.listen(port, () => console.log(`Server started on port ${port}`))

