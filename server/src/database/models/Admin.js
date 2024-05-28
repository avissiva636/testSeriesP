const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    sno: {
        type: Number,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    roles: {
        Admin: Number,
        Editor: Number
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // required: true
    },
    refreshToken: String
})

adminSchema.pre('save', async function (next) {
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

module.exports = mongoose.model('Admin', adminSchema);