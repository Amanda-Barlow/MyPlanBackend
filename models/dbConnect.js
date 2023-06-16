const mongoose = require('mongoose');



const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
    mongoose.connect(MONGODB_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(() => {
        console.log('Successfully connected to MongoDB')
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB');
        console.error(error);
    });
}

module.exports = dbConnect;