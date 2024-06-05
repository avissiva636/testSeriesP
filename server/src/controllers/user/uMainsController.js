const asyncHandler = require("express-async-handler");
const { mSalesModel: Msales, mQpDesModel: mQpDescription, } = require('../../database/index');
const { mResultModel: mainResult, mAttemptModel: mainsAttempt } = require("../../database/index");
const mongoose = require('mongoose');

//@desc Get All Mains papers, Paid details of user
//@route GET /user/mains/:uid
//access private
const getMainsPapers = asyncHandler(async (req, res) => {
    const uid = req.params.uid;

    const mainsSales = await Msales.find({ student: uid })
        .select("series");

    const convertedMainsSales = mainsSales.map(ms => ms.series);

    const result = await mQpDescription.aggregate([
        {
            $match: { mSeries: { $nin: convertedMainsSales } }
        },
        {
            $group: {
                _id: "$mSeries",
                totalCount: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: 'mseries',
                localField: '_id',
                foreignField: '_id',
                as: 'mSeriesDetails'
            }
        },
        {
            $project: {
                totalCount: 1,
                mSeriesDetails: { $arrayElemAt: ["$mSeriesDetails", 0] }
            }
        },
        {
            $project: {
                totalCount: 1,
                mSeriesDetails: {
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
            mains: result
        }
    )
});

//@desc Get Mains Description Id's of particaular series
//@route GET /user/mains/mainAttempt/:uid 
//access private
const getMainsAttempt = asyncHandler(async (req, res) => {
    const uid = req.params.uid;
    const { seriesId } = req.query;

    const psQuestions = await mainsAttempt.findOne({
        userId: new mongoose.Types.ObjectId(uid),
        seriesId: new mongoose.Types.ObjectId(seriesId)
    })
        .select('_id questionDescriptions');

    if (psQuestions) {
        res.status(200).json({
            msQuestionDescription: psQuestions?.questionDescriptions
        });
    } else {
        res.status(200).json({
            msQuestionDescription: []
        });
    }
});

//@desc Get specific Mains question paper
//@route GET /user/mains/exam/:qno ,{uid,uname}
//access private
const getMainsPaper = asyncHandler(async (req, res) => {
    const paramuid = req.params.qno;

    console.log('paramuid', paramuid);

    res.json(
        {
            questions: [`{
                qno, question,
                options: { option1, option2, option3, option4 }
            }`]
        }
    )
});

//@desc Submit Mains exam paper
//@route POST /user/mains/exam/:qno ,{{qno(questionPaperNumber),title(sn),sanswer[{qsn:sOption}]}}
//access private
const submitMainsPaper = asyncHandler(async (req, res) => {
    const { uid, mSeries, mqDesc } = req.body;

    const mainsAnswer = req?.mainsAnswer;
    const foundseriesAttempt = await mainsAttempt.findOne({
        userId: uid,
        seriesId: mSeries,
    });

    if (foundseriesAttempt) {
        if (mainsAnswer) {
            await mainResult.create({
                userId: uid,
                userIdString: uid,
                seriesId: mSeries,
                questionDescriptionId: mqDesc,
                correctedAnswer: mainsAnswer
            })

            foundseriesAttempt.questionDescriptions.push({
                questionDescriptionId: mqDesc,
                attempt: 1
            });

            await foundseriesAttempt.save();
        }
    }
    else {
        await mainResult.create({
            userId: uid,
            userIdString: uid,
            seriesId: mSeries,
            questionDescriptionId: mqDesc,
            correctedAnswer: mainsAnswer
        })
        await mainsAttempt.create({
            userId: uid,
            userIdString: uid,
            seriesId: mSeries,
            questionDescriptions: [{
                questionDescriptionId: mqDesc,
                attempt: 1
            }]
        })
    }


    res.json(
        {
            message: "proceeded"
        }
    )
});


module.exports = { getMainsPapers, getMainsAttempt, getMainsPaper, submitMainsPaper };