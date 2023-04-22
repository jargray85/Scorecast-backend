const router = require('express').Router()
const usersRoute = require('./userRoutes.js') // import route methods
// const usersRoute = require('./usersRoutes.js')

// URL Directory
router.use('/', usersRoute)

module.exports = router