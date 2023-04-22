const mongoose = require('mongoose')
const { DATABASE_URL } = process.env

// DATABASE CONNECTION //
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
    console.log('Error connecting to MongoDB Atlas', err);
});

// CONNECTION EVENTS //
mongoose.connection
    .on('open', () => console.log('You are connected to mongoose'))
    .on('close', () => console.log('You are disconnected from mongoose'))
    .on('error', (error) => console.log(error))

module.exports = {
    User: require('./User.js')
}