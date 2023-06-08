const router = require ('express').Router();
const { getForm } = require('../controllers/index');
const { createForm } = require('../controllers/index'); 
const { updateForm } = require('../controllers/index');
const { deleteForm } = require('../controllers/index')

//ROUTES
router.get('/', formController.getForm)
router.post('/', formController.createForm)
router.put('/:id', formController.updateForm)
router.delete('/:id', formController.deleteForm)

module.exports = router;
