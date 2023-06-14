const db = require('../models')
const asyncHandler = require('express-async-handler')
// console.log (db)
const Form=require('../models/form')
const User=require('../models/userModel')

//READ ROUTE GET/api/forms

const getForm = asyncHandler(async (req, res) => {
    
    const form = await Form.find({ user: req.user.id })
    if(forms.length === 0) {
    res.status(404).json({ message: 'Cannot find Form' })
    } else {
        res.status(200).json({ data: forms })
    }
})

const setForm = asyncHandler(async (req, res) => {
    router.post('./form', setForm);
    if (!req.body.text) {
    res.status(400)
    throw new Error('Add text field')
    }

const form = await Form.create({
    text: req.body.text,
    user: req.user.id
})

res.status(200).json(form)
})

//CREATE ROUTE POST/api/forms
const createForm = asyncHandler(async (req, res) => {
const createdForm = await Form.create(req.body)
    if(!createdForm){
    res.status(400).json({message: "Cannot create Form"})
    } else {
    res.status(201).json({data: createdForm})
    } 
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
        if (form.user.toString()!== user.id) {
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
            if (form.user.toString() !== user.id) {
                res.status(401)
                throw new Error('User not Authorized')
            }
    
        const deletedForm = await Form.findByIdAndDelete(req.params.id, {
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