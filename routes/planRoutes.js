const router = require('express').Router()
const { planController } = require('../controllers')

router.get('/', planController.getPlan)
router.post('/', planController.createPlan)
router.put('/plan/:id', planController.updatePlan)
router.delete('/plan/:id', planController.deletePlan)

module.exports = router;

