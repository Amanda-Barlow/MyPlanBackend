const router = require('express').Router();
const {planCtrl} = require('../controllers')

//CONTROLLERS

//ROUTES
router.get('/', planCtrl.getPlan)
router.post('/', planCtrl.createPlan)

module.exports = router;
