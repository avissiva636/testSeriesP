const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "please add the Name"]
    },
    age: {
        type: Number,
        required: [true, "please add the Age"]
    },
    sex: {
        type: String,
        required: [true, "please add the sex"],
        enum: ["Male", "Female", "Others"],
    },
    userName: {
        type: String,
        required: [true, "please add the User Name"]
    },
    password: {
        type: String,
        required: [true, "please add the Password"]
    },
    email: {
        type: String,
        required: [true, "please add the Email"]
    },
    mobile: {
        type: Number,
        required: [true, "please add the Mobile Number"]
    },
    telephone: {
        type: Number
    },
    otp: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 // Document expires after 20 seconds
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema);