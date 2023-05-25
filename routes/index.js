const router = require("express").Router()
const planRoute = require("./planRoute")

router.use('/plan', planRoute)

module.exports = router