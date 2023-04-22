const router = require('express').Router()

const { userCtrl } = require('../controllers') // all methods

// ROUTES - METHODS //
router.get('/', userCtrl.getUser) // find user
//router.post('/:id', userCtrl.createUser) // Create user
//router.delete('/users/:id', userCtrl.deleteUser) // delete user
router.get('/users/:id', userCtrl.getUserById); // find user by ID
router.post('/register', userCtrl.registerUser); // register user
router.post('/login', userCtrl.loginUser); // login user






module.exports = router