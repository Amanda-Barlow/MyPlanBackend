const router = require ('express').Router();
const { getForm } = require('../controllers/formController');
const { createForm } = require('../controllers/formController'); 
const { updateForm } = require('../controllers/formController');
const { deleteForm } = require('../controllers/formController')

//ROUTES
router.get('/', getForm)
router.post('/', createForm)
router.put('/:id', updateForm)
router.delete('/:id', deleteForm)

module.exports = router;
