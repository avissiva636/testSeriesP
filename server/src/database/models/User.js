const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require("crypto");

const userSchema = new Schema({
    userid: {
        type: String,
        default: crypto.randomUUID()
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    refreshToken: String
})

module.exports = mongoose.model('User', userSchema);