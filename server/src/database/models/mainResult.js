const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const mResultSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "please add the user id"]
    },
    userIdString: {
        type: String,
        required: [true, "please add the user id"]
    },
    questionDescriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mSeriesQpDesc",
        required: [true, "please add the questionDescription id"]
    }, 
    submittedAnswer:{},
    correctedAnswer:{},    
   
},
    { timestamps: true }
)


module.exports = mongoose.model('mResult', mResultSchema);