const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { format } = require('date-fns');

const mainsSalesSchema = new Schema({
    sno: {
        type: Number,
        unique: true
    },
    series: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mSeries",
        required: [true, "please add the mains series"]
    },
    seriesName: {
        type: String,
        required: [true, "please add the series name"]
    }
    ,
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: [true, "please add the student"]
    },
    studentName: {
        type: String,
        required: [true, "please add the student name"]
    },
    price: {
        type: Number,
        required: [true, "please add the price"]
    },
    time: {
        type: String,
        default: () => format(new Date(), 'yyy-MM-dd')
    },
},
    { timestamps: true }
)

mainsSalesSchema.pre('save', async function (next) {
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

module.exports = mongoose.model('mSales', mainsSalesSchema);