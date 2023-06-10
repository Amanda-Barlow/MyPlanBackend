require ('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/index');
const formRoutes = require('./routes/formRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const cors = require("cors");
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 4000;
const methodOverride = require('method-override');

//DATABASE CONNECTION
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set('strictQuery', true)
mongoose.connect(MONGODB_URI, {
    useNewParser: false,
});

//Mongo errors/success
const db = mongoose.connection
db.on('error', (err) => console.log(`${err.message} MongoDB NOT Running`))
db.on('connected', () => console.log ('MongoDB Connected'))
db.on('disconnected', () => console.log('MongoDB Disconnected'))


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/api/forms', require('./routes/formRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(cors());
app.use(errorHandler);
app.use('/', routes);
app.use(formRoutes);
app.use(userRoutes);


//LISTENER
app.listen(port, () => console.log(`Server started on port ${port}`))

