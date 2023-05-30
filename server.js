const routes = require('./routes/index')
const formRoute = require('./routes/formRoute')

//DEPENDENCIES
require("dotenv").config();
const{PORT} = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')

//MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

const MONGOOSE_URL = 'mongodb://localhose:27017/LSYSTEM'


//ROUTES
app.use("/", routes);
app.use((req,res) => {res.status(404) .json({message: "NOT A ROUTE"})
});

//LISTENER
mongoose.connect(MONGOOSE_URL, {useNewUrlParser: true})
.then (()=>app.listen(PORT, () => {
    console.log (`listening on PORT ${PORT}`);
}));

