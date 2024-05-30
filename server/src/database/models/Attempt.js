const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attemptSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pSeries",
        required: [true, "please add the user id"]
    },
    userIdString: {
        type: String,
        required: [true, "please add the user id"]
    },
    seriesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pSeries",
        required: [true, "please add the series id"]
    },
    seriesIdString: {
        type: String,
        required: [true, "please add the series id"]
    },
    questionDescriptions: [{
        questionDescriptionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pSeries",
            required: [true, "please add the questionDescription id"]
        },
        questionDescriptionIdString: {
            type: String,
            required: [true, "please add the questionDescription id"]
        },
        questions: [{
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "pSeries",
                required: [true, "please add the question id"]
            },
            questionIdString: {
                type: String,
                required: [true, "please add the question id"]
            },
            attempt: {
                type: Number,
                default: 0
            },
        }],
    }],

},
    { timestamps: true }
)


module.exports = mongoose.model('attempt', attemptSchema);