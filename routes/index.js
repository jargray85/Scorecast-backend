const router = require('express').Router()
const usersRoute = require('./usersRoutes.js') // import route methods


// URL Directory
router.use('/scorecast', usersRoute)

module.exports = router