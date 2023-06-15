const router = require('express').Router()
const { planController } = require('../controllers')

router.get('/', planController.getPlan)
router.post('/', planController.createPlan)
router.put('/:id', planController.updatePlan)
router.delete('/:id', planController.deletePlan)

module.exports = router;

