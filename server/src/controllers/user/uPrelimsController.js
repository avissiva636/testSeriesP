const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');
const { pSalesModel: PSales, psQuestionModel: psQuestion,
    pQpDesModel: pQpDescription, pResultModel: prelimResult,
    attemptModel } = require("../../database/index");

//@desc Get All prelims papers, Paid details of user
//@route GET /user/prelims/:uid
//access private
const getPrelimsPapers = asyncHandler(async (req, res) => {
    const uid = req.params.uid;

    const prelimsSales = await PSales.find({ student: uid })
        .select("series");
    const convertedPrelimSales = prelimsSales.map(ps => ps.series);
    const result = await pQpDescription.aggregate([
        {
            $match: { pSeries: { $nin: convertedPrelimSales } }
        },
        {
            $group: {
                _id: "$pSeries",
                totalCount: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: 'pseries',
                localField: '_id',
                foreignField: '_id',
                as: 'pSeriesDetails'
            }
        },
        {
            $match: { 'pSeriesDetails.status': "start" }
        },
        {
            $project: {
                totalCount: 1,
                pSeriesDetails: { $arrayElemAt: ["$pSeriesDetails", 0] }
            }
        },
        {
            $project: {
                totalCount: 1,
                pSeriesDetails: {
                    title: 1,
                    description: 1,
                    paymentLink: 1,
                    schedule: 1,
                    price: 1,
                }
            }
        }
    ]);

    res.json(
        {
            prelims: result
        }
    )
});

//@desc Get Prelim Description Id's of particaular series
//@route GET /user/prelims/prelimAttempt/:uid 
//access private
const getPrelimAttempt = asyncHandler(async (req, res) => {
    const uid = req.params.uid;
    const { seriesId } = req.query;

    const psQuestions = await attemptModel.findOne({
        userId: new mongoose.Types.ObjectId(uid),
        seriesId: new mongoose.Types.ObjectId(seriesId)
    })
        .select('_id questionDescriptions');


    if (psQuestions) {
        res.status(200).json({
            psQuestionDescription: psQuestions?.questionDescriptions
        });
    } else {
        res.status(200).json({
            psQuestionDescription: []
        });
    }
});

//@desc Get specific Prelims question paper
//@route GET /user/prelims/exam/:qno 
//access private
const getPrelimsPaper = asyncHandler(async (req, res) => {
    const qno = req.params.qno;

    // CHANGE////pqDesc to question number 
    const psQuestions = await psQuestion.findOne({ pqDesc: new mongoose.Types.ObjectId(qno) })
        .populate({
            path: 'pqDesc',
            select: 'pSeries'
        })
        .select('_id questions pqDescString pqDesc');

    if (psQuestions) {
        res.status(200).json({
            pQuestionId: psQuestions._id,
            pSeries: psQuestions.pqDesc.pSeries,
            pqDesc: psQuestions.pqDescString,
            questions: psQuestions.questions,
        });
    } else {
        res.status(404).json({ "message": "No prelims questions" });
    }
});

function evaluateAnswers(questions, answers) {
    const initialEvaluation = {
        evaluationResult: [],
        correctCount: 0,
        submitCount: 0
    };

    const { evaluationResult, correctCount, submitCount } = questions.reduce((acc, question) => {
        const sno = question.sno.toString();
        const submittedAns = answers[sno];
        const correctAns = question.correctAns;
        const difficulty = question.difficulty;
        if (submittedAns) {
            const status = (submittedAns === correctAns) ? "correct" : "wrong";
            if (status === "correct") {
                acc.correctCount++;
            }
            acc.submitCount++;
            acc.evaluationResult.push({ sno, submittedAns, correctAns, status, difficulty });
        }
        return acc;
    }, initialEvaluation);

    return { evaluationResult, correctCount, submitCount };
}

//@desc Submit prelims exam paper
//@route POST /user/prelims/exam/:qno ,{{qno(questionPaperNumber),title(sn),sanswer[{qsn:sOption}]}}
//access private
const submitPrelimsPaper = asyncHandler(async (req, res) => {
    const qno = req.params.qno;
    const { uid, pAnswer, pSeries, pqDesc } = req.body;

    const foundAttempt = await attemptModel.findOne({
        userId: uid,
        seriesId: pSeries,
    });

    const psQuestions = await psQuestion.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(qno) } },
        { $unwind: "$questions" },
        {
            $project: {
                _id: 0,
                sno: "$questions.sno",
                correctAns: "$questions.correctAns",
                difficulty: "$questions.difficulty"
            }
        }
    ]);

    const evaluatedAnswer = evaluateAnswers(psQuestions, pAnswer)

    if (foundAttempt) {
        const foundDescAttempt = await attemptModel.findOne({
            userId: uid,
            seriesId: pSeries,
            'questionDescriptions.questionDescriptionId': pqDesc
        });

        if (!foundDescAttempt) {
            foundAttempt.questionDescriptions.push({
                questionDescriptionId: pqDesc,
                questions: [{
                    questionId: qno,
                    attempt: 1
                }]
            })
            await foundAttempt.save();

            await prelimResult.create({
                userId: uid,
                userIdString: uid,
                questionDescriptionId: pqDesc,
                questionId: qno,
                result: evaluatedAnswer.evaluationResult,
                correctCount: evaluatedAnswer.correctCount,
                submitCount: evaluatedAnswer.submitCount,
            })
        } else {
            await attemptModel.findOneAndUpdate(
                {
                    _id: foundAttempt._id,
                },
                { $inc: { "questionDescriptions.$[outer].questions.$[inner].attempt": 1 } },
                {
                    arrayFilters: [
                        { "outer.questionDescriptionId": pqDesc },
                        { "inner.questionId": qno }
                    ],
                    new: true
                }
            );
        }
    }
    else {
        await prelimResult.create({
            userId: uid,
            userIdString: uid,
            questionDescriptionId: pqDesc,
            questionId: qno,
            result: evaluatedAnswer.evaluationResult,
            correctCount: evaluatedAnswer.correctCount,
            submitCount: evaluatedAnswer.submitCount,
        })

        await attemptModel.create({
            userId: uid,
            userIdString: uid,
            seriesId: pSeries,
            questionDescriptions: [{
                questionDescriptionId: pqDesc,
                questions: [{
                    questionId: qno,
                    attempt: 1
                }]
            }]
        })
    }

    const prelimSubmitResult = await prelimResult.find({ userId: uid, questionDescriptionId: pqDesc })
        .populate({
            path: "questionDescriptionId",
            select: "title description nQuestions cMarks wMarks -_id"
        })
        .select("questionDescriptionId");

    res.json(
        {
            prelimSubmitResult: {
                userId: uid,
                questionDescriptionId: prelimSubmitResult[0]?.questionDescriptionId,
                result: evaluatedAnswer.evaluationResult,
                correctCount: evaluatedAnswer.correctCount,
                submitCount: evaluatedAnswer.submitCount,
            }
        }
    )
});

module.exports = {
    getPrelimsPapers, getPrelimsPaper, submitPrelimsPaper,
    getPrelimAttempt
};