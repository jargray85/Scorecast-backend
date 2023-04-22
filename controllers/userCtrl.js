const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.User;
const jwt = require("jsonwebtoken");

//==============================================
// CONTROLLERS

//This modified function will search for a user with the name field equal to the req.params.username value, and will return a 404 error if the user is not found
const getUser = (req, res) => {
  User.find({}).then((foundUser) => {
    if (!foundUser) {
      res.status(404).json({ message: "Cannot find user" });
    } else {
      res.status(200).json({ data: foundUser });
    }
  });
};

// const createUser = (req, res) => {
//   const { name, password } = req.body;

//   // Validate request data
//   if (!name) {
//     return res.status(400).json({ message: "Name is required" });
//   }

//   if (!password) {
//     return res.status(400).json({ message: "Password is required" });
//   }

//   User.create(req.body)
//     .then((createdUser) => {
//       if (!createdUser) {
//         res.status(404).json({ message: "Cannot create User" });
//       } else {
//         const user = createdUser.toObject();
//         user.id = user._id;
//         delete user._id;
//         res.status(201).json({ data: user });
//         console.log(user);
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ message: error.message });
//     });
// };

// const deleteUser = (req, res) => {
//   User.findByIdAndDelete(req.params.id).then((deletedUser) => {
//     if (!deletedUser) {
//       res.status(400).json({ message: "Unable to delete user" });
//     } else {
//       res.status(200).json({ data: deletedUser, message: "User deleted" });
//     }
//   });
// };

//get user by id
const getUserById = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((foundUser) => {
      if (!foundUser) {
        res.status(404).json({ message: "Cannot find user" });
      } else {
        res.status(200).json({ data: foundUser });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

//LOGIN ROUTE

// Register
const registerUser = async (req, res) => {
  // our register logic goes here...
  // Our register logic starts here
  try {
    // Get user input
    const { username, email, password } = req.body;

    // Validate user input
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //set salt and bcrypt
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    // Create user in our database
    const NewUser = await User.create({
      username,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: hashedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: NewUser._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    NewUser.token = token;

    // return new user
    res.status(201).json(NewUser);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

// Login
const loginUser = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const existingUser = await User.findOne({ email });

    if (
      existingUser &&
      (await bcrypt.compare(password, existingUser.password))
    ) {
      // Create token
      const token = jwt.sign(
        { user_id: existingUser._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      existingUser.token = token;

      // user
      res.status(200).json(existingUser);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

//=======================================================
// EXPORTS

module.exports = {
  //createUser,
  //deleteUser,
  getUser,
  getUserById,
  registerUser,
  loginUser,
};
