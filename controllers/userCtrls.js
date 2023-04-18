const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../models')
const { query } = require('express')
console.log(db)
// const router = express.Router()


// AUTH REQUIRED MIDDLEWARE //
const authRequired = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/signin')
    }
    next()
}

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
const createUser = async (req, res) => {
    console.log(req.body)
    try {
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(req.body.password, salt);
        
        const createdUser = await db.Users.create({
        name: req.body.name,
        password: encryptedPassword
    });

    if (!createdUser) {
        res.status(404).json({message: 'Cannot create User'});
    } else {
        res.status(201).json({data: createdUser})
    }
    } catch (err) {
        console.log(err)
    }
}

// DELETE USER //
const deleteUser = (req, res) => {
    if (!req.session.currentUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
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
// SIGN UP PAGE (Register) //
// const signUp = async (req, res) => {
//     try {
//       // encrypt pws with salt
//       const salt = bcrypt.genSaltSync(10);
//       console.log(req.body); // password
//       req.body.password = bcrypt.hashSync(req.body.password, salt); // encrypt 
//       console.log(req.body); // encrypted pw
  
//       // Check if username already exists
//       const userExists = await User.findOne({ name: req.body.name });
//       if (userExists) {
//         res.send('That username is taken');
//       } else {
//         const createdUser = await User.create(req.body);
//         console.log(createdUser);
//         req.session.currentUser = createdUser;
//         res.redirect('/scorecast');
//       }
//     } catch (err) {
//       console.log(err);
//     }
// };
  

// SIGN IN FUNCTION //
// const signIn = (req, res) => {
//     const { username, password } = req.body;
  
//     User.findOne({ username })
//       .then((foundUser) => {
//         if (foundUser) {
//           const validLogin = bcrypt.compareSync(password, foundUser.password);
  
//           if (validLogin) {
//             req.session.currentUser = foundUser;
//             res.redirect('/scorecast');
//           } else {
//             res.send('Invalid username or password');
//           }
//         } else {
//           res.send('Invalid username or password');
//         }
//     })
//     .catch((err) => console.log(err));
// };  

////// SEARCH BAR TEST //////
// SEARCH BAR METHOD/ROUTE //
// const searchScore = (req, res) => {
//     const search = req.query.q
//     db.Users.find({ name: {$regex: query, $options: 'i' } })
//     .then((foundScore) => {
//         if (!foundScore) {
//             res.status(404).json({message: `No ${query} found`})
//         } else {
//             res.status(200).json({data: foundScore})
//         }
//     })
//     .catch((err) => {
//         res.status(500).json({ message: 'Server error', error: err})
//     })
// }

module.exports = {
    createUser,
    deleteUser,
    getUser,
    // authRequired
}