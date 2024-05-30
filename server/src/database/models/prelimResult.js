const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pResultSchema = new Schema({
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
    }]
},
    { timestamps: true }
)


module.exports = mongoose.model('pResult', pResultSchema);