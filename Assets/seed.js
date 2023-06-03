const mongoose = require('mongoose');
const Form = require('./models/form');



//Read the JSON files
const forms = fs.readFileSync(path, `${__dirname}/_seedData/forms.json`)
console.log(forms)
