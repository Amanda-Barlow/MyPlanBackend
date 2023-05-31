const db = require('../models')
const asyncHandler = require('express-async-handler')
console.log (db)

//CREATE ROUTE POST/api/form
const createForm = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error ('Please add a text field')
    }
    res.status(200).json({message: "Create Form"})
})

//READ ROUTE GET/api/form
const getForm = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Get Form"})
})

//UPDATE ROUTE PUT/api/form/:id
const updateForm = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update Form ${req.params.id}`})
})


//DESTROY ROUTE DELETE/api/form/:id
const deleteForm = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete Form ${req.params.id}`})
})


module.exports = {createForm, updateForm, deleteForm, getForm}