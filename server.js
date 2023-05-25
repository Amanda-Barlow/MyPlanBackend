const routes = require('./routes/index')

//DEPENDENCIES
require("dotenv").config();
const{PORT} = process.env;
const express = require("express");
const app = express();

//ROUTES
app.use("/", routes);
app.use((req,res) => {res.status(404) .json({message: "NOT A ROUTE"})
});

//LISTENER
app.listen(PORT, () => console.log (`listening on PORT ${PORT}`));
