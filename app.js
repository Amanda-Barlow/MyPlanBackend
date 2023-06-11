const dbConnect = require('models/dbConnect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const User = require('./models/userModel');
const bodyParser = require('body-parser');
const auth = require('./auth.js')

//body parser configuration
app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.json({ message: 'Server Response'});
    next();
})

dbConnect();
//Curb CORS errors
app.use((req, res, next) => {res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
);
res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
);
next();
});

app.post('/register', (req, res) => {
    //hash the password
    bcrypt.hash(req.body.password, 10)
    .then((hashedPassword) => {
        //create a new user instance and collect the data
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
        });
    })
    //save the new user
    user.save()
    //return success if the new user is added to the database successfully
    .then((result) => {
        res.status(201).send({
            message: 'User Created Successfully!',
            result,
        });
    })
    //catch error if the new user wasn't added successfully to the database
    .catch((error) => {
        response.status(500).send({
            message: 'Error creating user',
            error,
        });
    });
})
  //catch error if the password has isn't successful  
    .catch((e) => {
        res.status(500).send({
            message: 'Password was not hashed successfully', 
            e,
        });
    });
    
app.post('/login', (req, res) => {
    //check if email exists
    User.findOne({ email: req.body.email })
    //if email exists
    .then((user) =>{
        //compare the password entered and the hashed password found
        bcrypt.compare(req.body.password,
            user.password)
    })
    //if the passwords match
    .then((passwordCheck) => {
        if(!passwordCheck){
            return res.status(400).send({
                message: 'Password does not match',
                error,
            });
        }
         // create JWT token 
         const token = jwt.sign(
            {
                userId: user._id,
                userEmail: user.email,
            },
            'RANDOM-TOKEN',
            {expiresIn: '24hr'}
        );
        // return success response
        res.status(200).send({
            message: 'Login Successful',
            email: user.email,
            token,
        });
    })
    .catch((error) => {
        res.status(400).send({
            message: 'Passwords does not match',
            error,
        });
    });
})
    .catch((e) => {
        res.status(404).send({
            message: 'Email not found',
            e,
    });
});

//free endpoint
app.get('/free-endpoint', (req, res) => {
    res.json({ message: 'You are free to access anytime' });
});

app.get('/auth-endpoint', (req, res) => {
    res.json({ message: 'You are authorized to access'});
});
               

module.exports = app