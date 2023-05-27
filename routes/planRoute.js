const router = require('express').Router();
const {planCtrl} = require('../controllers')

//CONTROLLERS

//ROUTES
router.put('/:id', planCtrl.updatePlan)
router.delete('/:id', planCtrl.deletePlan)
router.get('/:id', planCtrl.getPlan)
router.post('/:id', planCtrl.createPlan)

module.exports = router;
