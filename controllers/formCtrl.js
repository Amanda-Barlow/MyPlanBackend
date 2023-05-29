const db = require('../models')
console.log (db)

//CREATE ROUTE
const createForm = (req, res) => {
    db.Form.create(req.body).then((createdForm)=>{
        if(!createdForm){
            res.status(400).json({message:'Cannot create form'}) //<-- add closing bracket here
        } else {
            res.status(201).json({data: createdForm, message:'Created form successfully'})
        }
    })
}

//UPDATE ROUTE
const updateForm = (req, res) => {
    db.Form.findByIdAndUpdate(req.params.id, req.body,{now:true})
    .then((updatedForm) =>{
        if(!updatedForm){
            res.status(400).json({Message: 'Could not update form'})
        }else{
            res.status(200).json({Data:updatedForm, Message: 'Form updated'})
        }
        }
    )}

//DESTROY ROUTE
const deleteForm = (req, res) => {
    db.Form.findByIdAndDelete(req.params.id)
    .then((deletedForm) =>{
        if(!deletedForm) {
            res.status(400).json({Message: 'Could not delete question'})
        }else{
            res.status(200).json({Data:deletedForm, Message: 'Plan Deleted'})
        }
        }
    )
}

const getForm = (req, res) => {
    db.Form.find({})
    .then((foundForm) => {
        if(!foundForm) {
            res.statues(404).json({message: "Cannot Find Plan"})
        }else{res.status(200).json({data: foundForm})}
    })
}



module.exports = {createForm, updateForm, deleteForm, getForm}