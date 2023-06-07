const router = require("express").Router()
const formRoutes = require("./formRoutes")
const userRoutes = require('./userRoutes')

router.use('/forms', formRoutes)
router.use('/users', userRoutes)

module.exports = router