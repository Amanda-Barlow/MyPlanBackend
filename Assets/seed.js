const mongoose = require('mongoose');
const Form = require('./models/form');
const asyncHandler = require('express-async-handler')

const getForms = async (req, res) => {
    try{
        const forms = await Form.find({user_id: req.user._id});
        console.log('Got Forms', getForms);
        res.json(forms);
    } catch(error){
        console.log('Got forms error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getFormById = async (req, res) => {
    try{
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid job ID' });
        }
        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }
        res.json(form);
    } catch(error){
        console.log('Got forms error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getForms,
    getFormById
}

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