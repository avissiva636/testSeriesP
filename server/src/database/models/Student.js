const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: [true, "please add the Name"]
    },
    age: {
        type: Number,
        required: [true, "please add the Age"]
    },
    userName: {
        type: String,
        required: [true, "please add the User Name"]
    },
    password: {
        type: String,
        required: [true, "please add the Password"]
    },
    Course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch"
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
    status: {
        type: String,
        enum: ["pending", "approved", "reject", "lock"],
        default: "pending"
    },
})

module.exports = mongoose.model('Student', studentSchema);