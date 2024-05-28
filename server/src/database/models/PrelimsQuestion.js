const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrelimsQuestionSchema = new Schema({
    pqDesc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pSeriesQpDesc",
        required: [true, "please add the PQ Description"]
    },
    pqDescString: {
        type: String,
        required: [true, "please add the pqDesc"]
    },
    questions: [{
        sno: {
            type: Number,
            required: [true, "please add the serial number"]
        },
        question: {
            type: String,
            required: [true, "please add the Question"]
        },
        options: {
            type: Object,
            required: [true, "please add the Options"],
        },
        correctAns: {
            type: String,
            required: [true, "please add the correct answer"],
            enum: ["option1", "option2", "option3", "option4",
                "option5", "option6", "option7", "option8",
                "option9"
            ]
        },
        explanation: {
            type: String,
            required: [true, "please add the explanation"]
        },
        difficulty: {
            type: String,
            required: [true, "please add the difficulty"],
            enum: ["easy", "medium", "hard"]
        },

    }]
},
    { timestamps: true }
)

module.exports = mongoose.model('prelimsQuestionSeries', PrelimsQuestionSchema);