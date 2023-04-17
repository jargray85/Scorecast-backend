const router = require('express').Router()
const { usersCtrl } = require('../controllers') // all methods

// ROUTES - METHODS //
router.get('/')
// router.get('/api/users/:id', usersCtrl.getUser) // find user
router.post('/api/users/register', usersCtrl.createUser) // Create user
router.delete('/api/users/:id', usersCtrl.deleteUser) // delete user

module.exports = router