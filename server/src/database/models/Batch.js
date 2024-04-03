const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const batchSchema = new Schema({
    course: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Batch', batchSchema);