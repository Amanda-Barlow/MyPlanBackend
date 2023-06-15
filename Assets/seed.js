const mongoose = require('mongoose');
const Plan = require('./models/plans');
const asyncHandler = require('express-async-handler')

const getPlans = async (req, res) => {
    try{
        const plans = await Plan.find({user_id: req.user._id});
        console.log('Got Plans', getPlans);
        res.json(plans);
    } catch(error){
        console.log('Got plans error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getPlanById = async (req, res) => {
    try{
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid job ID' });
        }
        const plan = await Plan.findById(id);
        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }
        res.json(plan);
    } catch(error){
        console.log('Got plans error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getPlans,
    getPlanById
}

//  {"Plan": {
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


// {"Plan":{
//     "name": "Bobby Brown",
//     "goal": "Become a Star",
//     "skills": "Rapping?",
//     "frequency": "once a week",
//     "coping": "drugs", 
//     "contacts": "no one",

//      }
// }