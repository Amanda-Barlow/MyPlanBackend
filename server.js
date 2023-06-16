require('dotenv').config();
const PORT = process.env.PORT 
const express = require("express");
const app = express();
const routes = require('./routes/index');
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const planRoutes = require('./routes/planRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const methodOverride = require('method-override');
const dbConnect = require('./models/dbConnect');
const bcrypt = require('bcrypt');

// Enable CORS for all routes
app.use(cors("*"))

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// Routes
app.use('/', routes);
app.use('/plan', planRoutes);
app.use('/user', userRoutes);

//catch all 404 route!
app.use((req, res) => {res.status(404).json({message: "NOT A PROPER ROUTE"})})


// DATABASE CONNECTION
dbConnect();
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: false,
});

// Mongo errors/success
const db = mongoose.connection;
db.on('error', (err) => console.log(`${err.message} MongoDB NOT Running`));
db.on('connected', () => console.log('MongoDB Connected'));
db.on('disconnected', () => console.log('MongoDB Disconnected'));

// LISTENER
app.listen(PORT, () => console.log(`Server started on port ${ PORT }`));
console.log('listening on port')