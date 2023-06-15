const router = require ('express').Router();

const { getPlan } = require('../controllers/planController');
const { createPlan } = require('../controllers/planController'); 
const { updatePlan } = require('../controllers/planController');
const { deletePlan } = require('../controllers/planController')

// const {protect} = require('../middleware/auth')

//ROUTES
router.route('/').get( getPlan ).post( createPlan );
router.route('/:id').delete( deletePlan ).put( updatePlan )

module.exports = router;
