const router = require('express').Router()
const usersRoute = require('./usersRoutes.js') // import route methods
// const usersRoute = require('./usersRoutes.js')

// URL Directory
router.use('/scorecast', usersRoute)

module.exports = router