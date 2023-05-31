const express = require('express')
const router = express.Router()
const { getForm, createForm, updateForm, deleteForm } = require('../controllers/formController')

//CONTROLLERS


//ROUTES
router.get('/', getForm)

router.post('/', createForm)

router.put('/:id', updateForm)

router.delete('/:id', deleteForm)

module.exports = router;
