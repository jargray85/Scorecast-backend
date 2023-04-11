const router = require('express').Router()
const { usersCtrl } = require('../controllers') // all methods

// ROUTES - METHODS //
router.get('/', usersCtrl.getUser) // find user
router.post('/:id', usersCtrl.createUser) // Create user
router.delete('/:id', usersCtrl.deleteUser) // delete user

module.exports = router