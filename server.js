const routes = require('./routes/index')

//DEPENDENCIES
require("dotenv").config();
const{PORT} = process.env;
const express = require("express");
const app = express();
const cors = require("cors");

//MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

//ROUTES
app.use("/", routes);
app.use((req,res) => {res.status(404) .json({message: "NOT A ROUTE"})
});

//LISTENER
app.listen(PORT, () => console.log (`listening on PORT ${PORT}`));
