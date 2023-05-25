const mongoose=require('mongoose');

const FormSchema= new mongoose.Schema({
    name: {type: String, required: true},
    dob: {type: Date, required: true},
    goal: {type: String, require: true},
    skills: {type: Boolean},
    frequency: {type: Number, required: true},
    coping: {type: String, require: true}, 
    contacts: {type: String},
    phq9: {type: Number, require: true}, 
    gad7: {type: Number, require: true}
}, {timestamps: true});

const userSchema = new mongoose.Schema({
    username: {type: String, required: true}, 
    password: {type: String, required: true}
})

module.exports = mongoose.model('Form', FormSchema);
module.exports = mongoose.model('User', userSchema);