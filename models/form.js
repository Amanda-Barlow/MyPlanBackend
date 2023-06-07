const mongoose=require('mongoose');


const formSchema= new mongoose.Schema({
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


const form = mongoose.model('form', formSchema);

module.exports = form;

//  {"Form": {
//     "name": "Bob Barker",
//     "goal": "Find the right Price",
//     "skills": "Saying Come On Down",
//     "frequency": "1",
//     "coping": "shopping, couponing", 
//     "contacts": "Drew Carey, Price is Right Beauties",
//     "phq9": "7", 
//     "gad7": "2"
//      }
// }
