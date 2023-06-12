const mongoose=require('mongoose');


const FormSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    name: {type: String, required: true},
    goal: {type: String, require: false},
    skills: {type: Boolean},
    frequency: {type: Number, required: false},
    coping: {type: String, require: false}, 
    contacts: {type: String},
    phq9: {type: Number, require: false}, 
    gad7: {type: Number, require: false}
}, {timestamps: true});


const Form = mongoose.model('Form', FormSchema);
module.exports = Form;


