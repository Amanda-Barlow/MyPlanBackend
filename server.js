require ('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/index');
const formRoutes = require('./routes/formRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const methodOverride = require('method-override')
const dbConnect = require('./models/dbConnect')
const port=process.env.PORT ||4000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/api/forms', require('./routes/formRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use('/', routes);
app.use('/forms', formRoutes);
app.use('/user', userRoutes);

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

//DATABASE CONNECTION
dbConnect();
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set('strictQuery', true)
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: false,
});



//Mongo errors/success
const db = mongoose.connection
db.on('error', (err) => console.log(`${err.message} MongoDB NOT Running`))
db.on('connected', () => console.log ('MongoDB Connected'))
db.on('disconnected', () => console.log('MongoDB Disconnected'))




//LISTENER
app.listen(port, () => console.log(`Server started on port ${port}`))
