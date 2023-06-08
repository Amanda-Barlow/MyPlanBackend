const db = require('../models')
const asyncHandler = require('express-async-handler')
console.log (db)
const Form = require('../models/form')
// const userModel= require('../models/userModel')

//READ ROUTE GET/api/form
const getForm = asyncHandler(async (req, res) => {
    const Form = await Form.find({ user: req.user.id })
    db.Form.find({})
    .then((foundForm) => {
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
    const form = await Form.findById(req.params.id)
    
    if (!form){
        res.status(400)
        throw new Error('Form not found')
    }

    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error('User not Found')
    }

    // Make sure the logged in user matches the form user
        if (global.user.toString() !== user.id) {
            res.status(401)
            throw new Error('User not Authorized')
        }

    const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    })
    res.status(200).json(updatedForm)
})


//DESTROY ROUTE DELETE/api/form/:id
const deleteForm = asyncHandler(async (req, res) => {
    const form = await Form.findById(req.params.id)
        if(!form){
            res.status(400)
            throw new Error('Form not found')
        } 
        const user = await User.findById(req.user.id)
        if(!user) {
            res.status(401)
            throw new Error('User not Found')
        }
    
        // Make sure the logged in user matches the form user
            if (global.user.toString() !== user.id) {
                res.status(401)
                throw new Error('User not Authorized')
            }
    
        const deletedForm = await Form.findByIdAndDelete(req.params.id, req.body, {
            new:true,
        })
        await form.remove()

        res.status(200).json({ id: req.params.id })
})

module.exports = {
    getForm,
    createForm, 
    updateForm, 
    deleteForm
}