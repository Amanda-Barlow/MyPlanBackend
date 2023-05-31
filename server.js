const routes = require('./routes/index')
const userRoute = require('./routes/userRoute')


//DEPENDENCIES
require("dotenv").config();
const{PORT} = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
// const mongoose = require('mongoose')

//MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use('/users', userRoute)

// const MONGODB_URL = process.env.MONGODB_URL


//ROUTES
app.use("/", routes);
app.use((req,res) => {res.status(404) .json({message: "NOT A ROUTE"})
});

//LISTENER
// mongoose.connect(MONGODB_URL, {useNewUrlParser: true})
// .then (()=>app.listen(PORT, () => {
//     console.log (`listening on PORT ${PORT}`);
// }));

