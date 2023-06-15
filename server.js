
require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require('mongoose');
const routes = require('./routes/index');
const planRoutes = require('./routes/planRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const port = process.env.PORT || 4000;
const methodOverride = require('method-override');
const dbConnect = require('./models/dbConnect');
const bcrypt = require('bcrypt');

// Enable CORS for all routes
app.use(cors())

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));


// Routes
// app.use('/api/plan', require('./routes/planRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));

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
app.listen(port, () => console.log(`Server started on port ${port}`));