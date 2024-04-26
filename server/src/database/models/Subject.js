const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    sno: {
        type: Number,
        unique: true
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

subjectSchema.pre('save', async function(next) {
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
      next(error);
    }
  });

module.exports = mongoose.model('Subject', subjectSchema);