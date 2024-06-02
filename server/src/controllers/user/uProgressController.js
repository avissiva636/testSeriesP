const asyncHandler = require("express-async-handler");
const { pResultModel: prelimResult, mResultModel: mainsResult } = require("../../database");

//@desc Get prelims progress descriptions
//@route GET /user/progress/prelims/:uid ,
//access private
const getPrelimProgressDescriptions = asyncHandler(async (req, res) => {
    const uid = req.params.uid;

    const foundResult = await prelimResult.find({ userId: uid })
        .populate({
            path: "questionDescriptionId",
            select: "title description nQuestions cMarks wMarks -_id"
        })
        .select("userId questionDescriptionId correctCount");

    res.json(
        {
            prelimResult: foundResult
            // prelims: ['{title,description,nQuestions, cAnswer, wAnswer, Marks}'],
            // mains: ['{title,description,nQuestions, cAnswer, wAnswer, Marks}'],
            // scheduled: ['{title,description,nQuestions, cAnswer, wAnswer, Marks}']
        }
    )
});

//@desc  Get mains progress descriptions
//@route GET /user/progress/mains/:uid ,
//access private
const getMainsProgressDescriptions = asyncHandler(async (req, res) => {
    const uid = req.params.uid;
    await mainsResult.create({
        userId: uid,
        userIdString: uid,
        questionDescriptionId: "664aedc64eba96a5fd8ae938",
        submittedAnswer: "one",
        correctedAnswer: "two"
    })

    const foundResult = await mainsResult.find({ userId: uid })
        .populate({
            path: "questionDescriptionId",
            select: "title description -_id"
        })
        .select("userId questionDescriptionId correctedAnswer");

    res.json(
        {
            mainResult: foundResult
            // prelims: ['{title,description,nQuestions, cAnswer, wAnswer, Marks}'],
            // mains: ['{title,description,nQuestions, cAnswer, wAnswer, Marks}'],
            // scheduled: ['{title,description,nQuestions, cAnswer, wAnswer, Marks}']
        }
    )
});

//@desc Get specific progress paper prelims, Mains and Scheduled paper
//@route GET /user/progress/:category/:qno ,
//access private
const getProgressPaper = asyncHandler(async (req, res) => {
    const paramQno = req.params.qno;
    const paramCategory = req.params.category;

    res.json(
        {
            qAttended: [`qno`],
            questions: [`qno, difficulty, analysis('true' / 'false')`]
        }
    )
});

module.exports = { getPrelimProgressDescriptions, getMainsProgressDescriptions, getProgressPaper };