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
        .select("userId questionDescriptionId correctCount submitCount");

    res.json(
        {
            prelimResult: foundResult            
        }
    )
});

//@desc  Get mains progress descriptions
//@route GET /user/progress/mains/:uid ,
//access private
const getMainsProgressDescriptions = asyncHandler(async (req, res) => {
    const uid = req.params.uid;

    const foundResult = await mainsResult.find({ userId: uid })
        .populate({
            path: "questionDescriptionId",
            select: "title description -_id"
        })
        .select("userId questionDescriptionId correctedAnswer");

    res.json(
        {
            mainResult: foundResult            
        }
    )
});

//@desc Get specific progress paper prelims, Mains and Scheduled paper
//@route GET /user/progress/prelimProgress/:qno ,
//access private
const getPrelimsProgressResult = asyncHandler(async (req, res) => {
    const paramQno = req.params.qno;

    const foundResult = await prelimResult.findById(paramQno)
        .select("result");

    res.json(
        {
            foundResult            
        }
    )
});

module.exports = { getPrelimProgressDescriptions, getMainsProgressDescriptions, getPrelimsProgressResult };