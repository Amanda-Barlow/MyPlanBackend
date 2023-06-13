const router = require ('express').Router();

const { getForm } = require('../controllers/formController');
const { createForm } = require('../controllers/formController'); 
const { updateForm } = require('../controllers/formController');
const { deleteForm } = require('../controllers/formController')

const {protect} = require('../middleware/auth')

//ROUTES
router.route('/').get(protect, getForm).post(protect, createForm);
router.route('/:id').delete(protect, deleteForm).put(protect, updateForm)

module.exports = router;
