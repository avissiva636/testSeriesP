const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pResultSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "please add the user id"]
    },
    userIdString: {
        type: String,
        required: [true, "please add the user id"]
    },
    questionDescriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pSeriesQpDesc",
        required: [true, "please add the questionDescription id"]
    }, 
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "prelimsQuestionSeries",
        required: [true, "please add the question id"]
    },
    result: [{
        sno: {
            type: String,
            required: [true, "please add the sno"]
        },
        submittedAns: {
            type: String,
            required: [true, "please add the submittedAns"]
        },
        correctAns: {
            type: String,
            required: [true, "please add the correctAns"]
        },
        status: {
            type: String,
            required: [true, "please add the status"]
        },
    }],
    correctCount: {
        type: Number,
        required: [true, "please add the correct count"]
    }
},
    { timestamps: true }
)


module.exports = mongoose.model('pResult', pResultSchema);