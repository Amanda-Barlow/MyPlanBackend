const db = require('../models')
const asyncHandler = require('express-async-handler')
console.log (db)
const Form = require('../models/form')

//READ ROUTE GET/api/form
const getForm = asyncHandler(async (req, res) => {
    const form = await Form.find()
    res.status(200).json(form)
})

//CREATE ROUTE POST/api/form
const createForm = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error ('Please add your text')
    }

    const form = await form.create({
       form: req.body.text
    })

    res.status(200).json(form)
})

//UPDATE ROUTE PUT/api/form/:id
const updateForm = asyncHandler(async (req, res) => {
    const form = await Form.findById(req.params.id)

    if(!form) {
        res.status(400)
        throw new Error('Form not found')
    }

    const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedForm)
})


//DESTROY ROUTE DELETE/api/form/:id
const deleteForm = asyncHandler(async (req, res) => {
    const form = await Form.findById(req.params.id)

    if(!form) {
        res.status(400)
        throw new Error('Form not found')
    }

    await form.remove();

    res.status(200).json({ id: req.params.id })
})


module.exports = {createForm, updateForm, deleteForm, getForm}