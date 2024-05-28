const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainsQpDescSchema = new Schema({
    sno: {
        type: Number,
        unique: true
    },
    mSeries: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mSeries",
        required: [true, "please add the reference id"]
    },
    series: {
        type: String,
        required: [true, "please add the Series"]
    },
    title: {
        type: String,
        required: [true, "please add the Title"]
    },
    description: {
        type: String,
        required: [true, "please add the Description"]
    },
    alottedTime: {
        type: String,
        required: [true, "please add the Alotted Time"]
    },
    instruction: {
        type: String,
        required: [true, "please add the Instruction"]
    },
    question: {
        type: String,
        required: [true, "please add the Questions"]
    },
    schedule: {
        type: String,
        required: [true, "please add the schedule"]
    },
    status: {
        type: String,
        enum: ["start", "stop", "test"],
        default: "stop"
    },
},
    { timestamps: true }
)

mainsQpDescSchema.pre('save', async function (next) {
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

module.exports = mongoose.model('mSeriesQpDesc', mainsQpDescSchema);



