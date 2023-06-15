const db = require('../models')
const asyncHandler = require('express-async-handler')
console.log (db)
const Plan=require('../models/plan')
const User=require('../models/userModel')
 
//PUT ROUTE PUT/api/plans
const setPlan = asyncHandler(async (req, res) => {
    router.post('./plan', setPlan);
    if (!req.body.text) {
    res.status(400)
    throw new Error('Add text field')
    }

const plan = await Plan.create({
    text: req.body.text,
    user: req.user.id
})
const { body } = req; 
if (!body.name) {
  return res.status(400).send({ message: 'Plan name is required' }); 
}

res.status(200).json(plan)
})

//READ ROUTE GET/api/plans

const getPlan = asyncHandler(async (req, res) => { 
    const plan = await Plan.find({ user: req.user })
    db.Plan.find({})
    if(plan.length === 0) {
    res.status(404).json({ message: 'Cannot find Plan' })
    } else {
        res.status(200).json({ data: foundPlan })
    }
})



//CREATE ROUTE POST/api/plans
const createPlan = asyncHandler(async (req, res) => {
const createdPlan = await Plan.create(req.body)
    if(!createdPlan){
    res.status(400).json({message: "Cannot create Plan"})
    } else {
    res.status(201).json({data: createdPlan})
    } 
})

//UPDATE ROUTE PUT/api/plan/:id
const updatePlan = asyncHandler(async (req, res) => {
    const plan = await Plan.findById(req.params.id)
    
    if (!plan){
        res.status(400)
        throw new Error('Plan not found')
    }

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not Found')
    }

    // Make sure the logged in user matches the plan user
        if (plan.user.toString()!== user.id) {
            res.status(401)
            throw new Error('User not Authorized')
        }

    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    })

    res.status(200).json(updatedPlan)
})


//DESTROY ROUTE DELETE/api/plan/:id
const deletePlan = asyncHandler(async (req, res) => {
    const plan = await Plan.findById(req.params.id)
        if(!plan){
            res.status(400)
            throw new Error('Plan not found')
        } 
        const user = await User.findById(req.user.id)

        if(!user) {
            res.status(401)
            throw new Error('User not Found')
        }
    
        // Make sure the logged in user matches the plan user
            if (plan.user.toString() !== user.id) {
                res.status(401)
                throw new Error('User not Authorized')
            }
    
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id, {
            new:true,
        })
        await plan.remove()

        res.status(200).json({ id: req.params.id })
})

module.exports = {
    getPlan,
    createPlan, 
    updatePlan, 
    deletePlan
}