const db = require('../models')
console.log (db)

const getPlan = (req, res) => {
    db.Form.find({})
    .then((foundForm) => {
        if(!foundForm) {
            res.statues(404).json({message: "Cannot Find PLan"})
        }else{res.status(200).json({data: foundForm})}
    })
}

createPlan = (req,res) => {
    res.send('createPlan')
}

module.exports = {createPlan}