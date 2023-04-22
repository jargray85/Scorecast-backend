const mongoose = require('mongoose')

// MODELS //
const UserSchema = new mongoose.Schema({
    username: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
    teams: [],
    players: [],
    games: []
})

const User = mongoose.model('User', UserSchema)

module.exports = User;