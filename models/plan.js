const mongoose=require('mongoose');

const PlanSchema= new mongoose.Schema({
    name: {type: String, required: true},
    goal: {type: String, require: false},
    skills: {type: String},
    frequency: {type: String, required: false},
    coping: {type: String, require: false}, 
    contacts: {type: String},
}, {timestamps: true});


const Plan = mongoose.model('Plan', PlanSchema);
module.exports = Plan;


    // phq9: {type: Number, require: false}, 
    // gad7: {type: Number, require: false}