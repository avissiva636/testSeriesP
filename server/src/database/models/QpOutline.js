const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const qpOutlineSchema = new Schema({
    title: {
        type: String,
        required: [true, "please add the Title"]
    },
    description: {
        type: String,
        required: [true, "please add the Description"]
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch"
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    nOptions: {
        type: Number,
        required: [true, "please add the no of options"]
    },
    nQuestions: {
        type: Number,
        required: [true, "please add the no of questions"]
    },
    alottedTime: {
        type: Number,
        required: [true, "please add the alotted Time"]
    },
    cMarks: {
        type: Number,
        required: [true, "please add the correct marks"]
    },
    wMarks: {
        type: Number,
        required: [true, "please add the wrond marks"]
    },
    random: {
        type: String,
        enum: ["yes", "no"],
        default: "no"
    },
    instruction: {
        type: String,
    },
})

module.exports = mongoose.model('QpOutline', qpOutlineSchema);