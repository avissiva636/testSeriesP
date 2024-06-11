const asyncHandler = require("express-async-handler");
const { pSalesModel: PSales, attemptModel, mAttemptModel: mainsAttempt, mSalesModel } = require("../../database");
const mongoose = require('mongoose');

//@desc Get All Archive prelims, Mains and Scheduled paper
//@route GET /user/archive/:uid
//access private
const getArchivePaper = asyncHandler(async (req, res) => {
    const uid = req.params.uid;

    const prelimsSales = await PSales.aggregate([
        {
            $match: { student: new mongoose.Types.ObjectId(uid) }
        },
        {
            $project: {
                series: 1
            }
        },
        {
            $lookup: {
                from: 'pseriesqpdescs',
                localField: 'series',
                foreignField: 'pSeries',
                as: 'seriesDesc'
            }
        },
        {
            $unwind: "$seriesDesc"
        },

        {
            $lookup: {
                from: 'prelimsquestionseries',
                localField: 'seriesDesc._id',
                foreignField: 'pqDesc',
                as: 'question'
            }
        },
        {
            $project: {
                _id: 0,
                seriesDesc: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    nQuestions: 1,
                    alottedTime: 1,
                    instruction: 1
                },
                question: {
                    _id: 1,
                    pqDesc: 1,
                    questions: 1
                }
            }
        },
    ])

    const mainsSales = await mSalesModel.aggregate([
        {
            $match: { student: new mongoose.Types.ObjectId(uid) }
        },
        {
            $addFields: {
                seriesId: "$series"
            }
        },
        {
            $project: {
                seriesId: 1,
                series: 1
            }
        },
        {
            $lookup: {
                from: 'mseriesqpdescs',
                localField: 'series',
                foreignField: 'mSeries',
                as: 'seriesDesc'
            }
        },
        {
            $unwind: "$seriesDesc"
        },
        {
            $project: {
                _id: 0,
                seriesId: 1,
                seriesDesc: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    alottedTime: 1,
                    instruction: 1,
                    question: 1
                },
            }
        },
    ])

    res.json(
        {
            prelims: prelimsSales,
            mains: mainsSales
        }
    )
});

//@desc Get Prelim Description Id's of particaular series
//@route GET /user/archive/archiveAttempt/:uid
//access private
const getArchiveAttempt = asyncHandler(async (req, res) => {
    const uid = req.params.uid;

    const psQuestions = await attemptModel.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(uid),
                // seriesId: new mongoose.Types.ObjectId(seriesId)
            }
        },
        {
            $unwind: "$questionDescriptions"
        },
        {
            $unwind: "$questionDescriptions.questions"
        },
        {
            $match: {
                "questionDescriptions.questions.attempt": 1
            }
        },
        {
            $project: {
                questionDescId: "$questionDescriptions.questionDescriptionId",
                questionId: "$questionDescriptions.questions.questionId",
            }
        }
    ]);


    if (psQuestions) {
        res.status(200).json({
            psQuestionDescription: psQuestions
        });
    } else {
        res.status(200).json({
            psQuestionDescription: []
        });
    }
});

//@desc Get Mains Description Id's of particaular series
//@route GET /user/archive/archiveMAttempt/:uid
//access private
const getMainsArchiveAttempt = asyncHandler(async (req, res) => {
    const uid = req.params.uid;

    const msAttempts = await mainsAttempt.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(uid),
                // seriesId: new mongoose.Types.ObjectId(seriesId)
            }
        },
        {
            $unwind: "$questionDescriptions"
        },
        {
            $match: {
                "questionDescriptions.attempt": 1
            }
        },
        {
            $project: {
                questionDescId: "$questionDescriptions.questionDescriptionId",
            }
        }
    ]);


    if (msAttempts) {
        res.status(200).json({
            msQuestionDescription: msAttempts
        });
    } else {
        res.status(200).json({
            msQuestionDescription: []
        });
    }
});



module.exports = { getArchivePaper, getArchiveAttempt, getMainsArchiveAttempt };