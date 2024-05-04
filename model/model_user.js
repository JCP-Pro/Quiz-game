const mongoose = require('mongoose')

//TODO: image src
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date }, //Use const date = new Date() to get the date
    updatedAt: { type: Date },
    //profile and stats
    profileStatus: { type: String },
    img: { type: String },
    wins: { type: Number},
    losses: { type: Number},

})

const User = mongoose.model('User', userSchema)

module.exports = User