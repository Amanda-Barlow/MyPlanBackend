const express = require("express");
const dotenv = require('dotenv').config()
const port = process.env.PORT || 4000;

const app = express();
const routes = require('./routes/index')
const userRoute = require('./routes/userRoute')
const cors = require("cors");
const mongoose = require('mongoose')
const {errorHandler} = require('./middleware/errorMiddleware')
// const MONGODB_URL = process.env.MONGODB_URL

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/users', userRoute)
app.use('/api/form', require('./routes/formRoute'))


app.use(errorHandler)

//LISTENER
app.listen(port, () => console.log(`Server started on port ${port}`))

