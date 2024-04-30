const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pSeriesSchema = new Schema({
    sno: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        required: [true, "please add the Title"]
    },
    description: {
        type: String,
        required: [true, "please add the Description"]
    },
    status: {
        type: String,
        enum: ["start", "stop", "test"],
        default: "stop"
    },
    paid: {
        type: String,
        enum: ["paid", "free"],
        required: [true, "please select the paid"]
    },
    price: {
        type: Number,
        required: [true, "please add the price"]
    },
    schedule: {
        type: String,
        required: [true, "please add the schedule"]
    },
    paymentLink: {
        type: String,
        required: [true, "please add the PaymentLink"]
    },
},
    { timestamps: true }
)

pSeriesSchema.pre('save', async function (next) {
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

module.exports = mongoose.model('pSeries', pSeriesSchema);