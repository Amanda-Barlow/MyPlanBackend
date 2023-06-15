const router = require("express").Router()
const planRoutes = require("./planRoutes")
const userRoutes = require('./userRoutes')

router.use('/plans', planRoutes)
router.use('/users', userRoutes)

module.exports = router