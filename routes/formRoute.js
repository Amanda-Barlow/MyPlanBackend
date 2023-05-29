const router = require('express').Router();
const {formCtrl} = require('../controllers')

//CONTROLLERS

//ROUTES

router.put('/:id', formCtrl.updateForm)
router.delete('/:id', formCtrl.deleteForm)
router.get('/:id', formCtrl.getForm)
router.post('/:id', formCtrl.createForm)

module.exports = router;
