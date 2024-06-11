const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainsAttemptSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "please add the user id"]
    },
    userIdString: {
        type: String,
        required: [true, "please add the user id"]
    },
    seriesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mSeries",
        required: [true, "please add the series id"]
    },
    questionDescriptions: [{
        questionDescriptionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "mSeriesQpDesc",
            required: [true, "please add the questionDescription id"]
        },
        attempt: {
            type: Number,
            default: 0
        },
    }],

},
    { timestamps: true }
)


module.exports = mongoose.model('mainsAttempt', mainsAttemptSchema);