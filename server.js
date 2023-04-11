// DEPENDENCIES //
const express = require("express")
const app = express()
const cors = require("cors")
// const session = require('express-session')
require("dotenv").config()


// // SESSIONS //
// const SESSION_SECRET = process.env.SESSION_SECRET
// // console.log(SESSION_SECRET)
// // SECRET
// app.use(session({
//     secret: SESSION_SECRET,
//     resave: true, 
//     saveUninitialized: true
// }))
// console.log('session secret is ', SESSION_SECRET)

// MIDDLEWARE //
app.use(cors()) // prevent cors errors/open access across all origins
app.use(express.urlencoded({extended: true})) // req.body
app.use(express.json()) // parse json

// ROUTES // 
const routes = require('./routes/index')
app.use('/', routes)

// CATCH ROUTE //
app.use((req, res) => {res.status(404).json({message: 'NOT A PROPER ROUTE'})})

// PORT //
const { PORT } = process.env
// console.log(PORT)
// LISTENER //
app.listen(PORT, () => console.log(`Hello Seattle, I\'m listening on PORT ${PORT}`))