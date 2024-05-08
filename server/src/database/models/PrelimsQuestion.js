const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrelimsQuestionSchema = new Schema({
    sno: {
        type: Number,
        unique: true
    },
    pqPaper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pSeriesQpDesc",
        required: [true, "please add the pqPaper"]
    },
    title: {
        type: String,
        required: [true, "please add the Title"]
    },
    question: {
        type: String,
        required: [true, "please add the Question"]
    },
    options: [{
        type: String,
        required: [true, "please add the Options"],
        enum: ["option1", "option2", "option3", "option4",
            "option5", "option6", "option7", "option8",
            "option9"
        ]
    }],
    correctAns: {
        type: String,
        required: [true, "please add the correct answer"],
        enum: ["easy", "medium", "hard"]
    },
    explanation: {
        type: String,
        required: [true, "please add the explanation"]
    },

},
    { timestamps: true }
)

PrelimsQuestionSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    try {
        const latestDoc = await this.constructor.findOne({}, {}, { sort: { sno: -1 } });
        if (latestDoc) {
            this.sno = latestDoc.sno + 1;
        } else {
            this.sno = 1;
        }
        next();
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model('prelimsQuestionSeries', PrelimsQuestionSchema);