const express = require("express");
const {errorHandler} = require('./middleware/errorMiddleware')
const app = express();
const routes = require('./routes/index')
const userRoute = require('./routes/userRoute')
const cors = require("cors");

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



app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/users', userRoute)
app.use('/api/form', require('./routes/formRoute'))
app.use(cors());
app.use(errorHandler)
app.use('/', routes)
app.use(connectDB)

//LISTENER
app.listen(port, () => console.log(`Server started on port ${port}`))

