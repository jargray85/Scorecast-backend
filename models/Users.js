const mongoose = require('mongoose')

// MODELS //
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    teams: [],
    players: [],
    games: []
})

const User = mongoose.model('User', UserSchema)

module.exports = User