const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../models')
console.log(db)
const router = express.Router()

// FIND USER //
const getUser = (req, res) => {
    db.Users.find({})
    .then((foundUser) => {
        if(!foundUser) {
            res.status(404).json({message: 'Cannot find user'})
        } else {
            res.status(200).json({data: foundUser})
        }
    })
}

// CREATE USER //
const createUser = (req, res) => {
    db.Users.create(req.body)
    .then((createdUser) => {
        if(!createdUser) {
            res.status(404).json({message: 'Cannot create User'})
        } else {
            res.status(201).json({data: createdUser})
        }
    })
}

// DELETE USER //
const deleteUser = (req, res) => {
    db.Users.findByIdAndDelete(req.params.id)
    .then((deletedUser) => {
        if(!deletedUser) {
            res.status(400).json({message: 'Unable to delete user'})
        } else {
            res.status(200).json({data: deletedUser, message: 'User deleted'})
        }
    })
}

/// TESTING SIGN IN STUFF ///
/////////////////////////////
// SIGN UP PAGE //
// router.post('/signup', (req, res) => {
//     // encrypt pws with salt
//     const salt = bcrypt.genSaltSync(10);
//     console.log(req.body); // password
//     req.body.password = bcrypt.hashSync(req.body.password, salt); // encrypt 
//     console.log(req.body); // encrypted pw

//     // Check if username already exists
//     User.findOne({ name: req.body.name })
//         .then(userExists => {
//             if(userExists) {
//                 res.send('That username is taken');
//             } else {
//                 User.create(req.body)
//                     .then(createdUser => {
//                         console.log(createdUser);
//                         req.session.currentUser = createdUser;
//                         res.redirect('/scores');
//                     })
//                 .catch(err => console.log(err));
//             }
//         })
//         .catch(err => console.log(err));
// });

// SIGN IN PAGE
// router.get('/signin', (req, res) => {
//     res.send('this is the signin page');
// });

// SIGN UP PAGE //
// router.post('/signup', (req, res) => {
//     // encrypt pws with salt
//     const salt = bcrypt.genSaltSync(10);
//     console.log(req.body); // password
//     req.body.password = bcrypt.hashSync(req.body.password, salt); // encrypt 
//     console.log(req.body); // encrypted pw

//     // Check if username already exists
//     User.findOne({ name: req.body.name })
//         .then(userExists => {
//             if(userExists) {
//                 res.send('That username is taken');
//             } else {
//                 User.create(req.body)
//                     .then(createdUser => {
//                         console.log(createdUser);
//                         req.session.currentUser = createdUser;
//                         res.redirect('/scores');
//                     })
//                 .catch(err => console.log(err));
//             }
//         })
//         .catch(err => console.log(err));
// })

// SIGN IN FUNCTION //
// router.post('/signin', (req, res) => {
//     // find user
//     User.findOne({ username: req.body.username })
//       .then((foundUser) => {
//         if (foundUser) {
//           // compare passwords w/ bcrpt
//           const validLogin = bcrypt.compareSync(req.body.password, foundUser.password);
//           // compareSync returns true or false
//           if (validLogin) {
//             req.session.currentUser = foundUser;
//             // session is logged in
//             res.redirect('/scores');
//             } else {
//             res.send('Invalid username or password');
//             }
//         }
//     })
// })

module.exports = {
    createUser,
    deleteUser,
    getUser
}