const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prelimsQpDescSchema = new Schema({
    sno: {
        type: Number,
        unique: true
    },
    pSeries: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pSeries",
        required: [true, "please add the reference id"]
    },
    series: {
        type: String,
        required: [true, "please add the Series"]
    },
    title: {
        type: String,
        required: [true, "please add the title"]
    },
    description: {
        type: String,
        required: [true, "please add the description"]
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
        type: String,
        required: [true, "please add the Number of Options"]
    },
    nQuestions: {
        type: String,
        required: [true, "please add the Number of questions"]
    },
    alottedTime: {
        type: String,
        required: [true, "please add the Alotted Time"]
    },
    cMarks: {
        type: String,
        required: [true, "please add the PaymentLink"]
    },
    wMarks: {
        type: String,
        required: [true, "please add the Correct Marks"]
    },
    random: {
        type: String,
        enum: ["yes", "no"],
        default: "no"
    },
    instruction: {
        type: String,
        required: [true, "please add the Instruction"]
    },
},
    { timestamps: true }
)

prelimsQpDescSchema.pre('save', async function (next) {
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

module.exports = mongoose.model('pSeriesQpDesc', prelimsQpDescSchema);