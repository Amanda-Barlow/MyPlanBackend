const mongoose=require('mongoose');


const FormSchema= new mongoose.Schema({
    name: {type: String, required: true},
    goal: {type: String, require: false},
    skills: {type: String},
    frequency: {type: String, required: false},
    coping: {type: String, require: false}, 
    contacts: {type: String},
}, {timestamps: true});


const Form = mongoose.model('Form', FormSchema);
module.exports = Form;


    // phq9: {type: Number, require: false}, 
    // gad7: {type: Number, require: false}