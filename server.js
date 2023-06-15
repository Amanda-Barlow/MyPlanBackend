
require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/index');
const planRoutes = require('./routes/planRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const cors = require("cors");
const port = process.env.PORT || 4000;
const methodOverride = require('method-override');
const dbConnect = require('./models/dbConnect');
const bcrypt = require('bcrypt');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Enable CORS for all routes
app.use(cors())

// Routes
app.use('/api/plan', require('./routes/planRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use('/', routes);
app.use('/plan', planRoutes);
app.use('/user', userRoutes);

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