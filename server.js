const express = require("express");
const {errorHandler} = require('./middleware/errorMiddleware')
const app = express();
const routes = require('./routes/index')
const formRoutes = require('./routes/formRoutes')
const userRoutes = require('./routes/userRoutes')
const cors = require("cors");

const port = process.env.PORT || 4000;
const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGOOSE_URI)
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/forms', require('./routes/formRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(cors());
app.use(errorHandler)
app.use('/', routes)
app.use(connectDB)

//LISTENER
app.listen(port, () => console.log(`Server started on port ${port}`))

