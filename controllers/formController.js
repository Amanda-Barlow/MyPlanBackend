const db = require('../models')
const asyncHandler = require('express-async-handler')
console.log (db)
const Form = require('../models/form')
const userModel= require('../models/userModel')

//READ ROUTE GET/api/form
const getForm = asyncHandler(async (req, res) => {
    const form = await form.find({ user: req.user.id })

    
    db.Form.find({})
    .then((foundForm) => {
        console.log(foundForm)
            if(!foundForm){
                console.log('inside if not form')
                res.status(404).json({message: "Cannot find Form"})
            } else {
                console.log('inside else of form')
                res.status(200).json({data: foundForm})
            }
        })
    })

//CREATE ROUTE POST/api/form
const createForm = asyncHandler(async (req, res) => {
    console.log(req.body)
    db.Form.create(req.body)
    .then((createdForm) => {
        if(!createdForm){
            res.status(400).json({message: "Cannot create Form"})
        } else {
            res.status(201).json({data: createdForm})
        } 
    })
})

//UPDATE ROUTE PUT/api/form/:id
const updateForm = asyncHandler(async (req, res) => {
    db.Form.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedForm) => {
        if(!updatedForm){
            res.status(400).json({Message: "Could not update Form"})
        } else {
            res.status(200).json({Data: updatedForm, Message: "Updated Form"})
        }
    })
})


//DESTROY ROUTE DELETE/api/form/:id
const deleteForm = asyncHandler(async (req, res) => {
    db.Form.findByIdAndDelete(req.params.id)
    .then((deletedForm) => {
        if(!deletedForm){
            res.status(400).json({Message: "Could not delete Form"})
        } else {
            res.status(200).json({Data: deletedForm, Message: "Deleted Form"})
        }
    })
})

module.exports = {
    getForm,
    createForm, 
    updateForm, 
    deleteForm
}