const router = require("express").Router()
const planRoutes = require("./planRoutes")
const userRoutes = require('./userRoutes')

router.use('/plan', planRoutes)
router.use('/user', userRoutes)

module.exports = router