const router = require("express").Router()
const formRoute = require("./formRoute")

router.use('/form', formRoute)

module.exports = router