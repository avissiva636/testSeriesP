const asyncHandler = require("express-async-handler");
const { psQuestionModel: psQuestion, } = require("../../database/index");

//@desc Get All discussion prelims, Mains and Scheduled paper
//@route GET /user/discussion/:uid ,
//access private
const getDiscussionResults = asyncHandler(async (req, res) => {

    const paramuid = req.params.uid;

    res.json(
        {
            prelims: ['{title, description, subject, nQuestions, timeAlloted}'],
            mains: ['{title, description, subject, nQuestions, timeAlloted}]}'],
            scheduled: ['{title, description, subject, nQuestions, timeAlloted}']
        }
    )
});

//@desc Get specific discussion paper prelims, Mains and Scheduled paper
//@route GET /user/discussion/prelims/:qno ,
//access private
const getDiscussionPaper = asyncHandler(async (req, res) => {
    const qno = req.params.qno;

    const psQuestions = await psQuestion.find({ pqDesc: qno });
    if (psQuestions) {
        res.status(200).json({ questions: psQuestions[0].questions });
    } else {
        res.status(404).json({ "message": "No prelims questions" });
    }
});

module.exports = { getDiscussionResults, getDiscussionPaper };