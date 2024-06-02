const asyncHandler = require("express-async-handler");
const { pSalesModel: PSales, mSalesModel: Msales } = require("../../database/index");
const mongoose = require('mongoose');
//@desc Get All Purchased prelims and Mains paper
//@route GET /user/purchased/:uid 
//access private
const getPurchasedPapers = asyncHandler(async (req, res) => {
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
                as: 'series'
            }
        },
        {
            $addFields: {
                question: "$series"
            }
        },
        {
            $unwind: "$series"
        },
        {
            $group: {
                _id: "$series.pSeries",
                totalCount: { $sum: 1 },
                question: { $first: "$question" }
            }
        },
        {
            $lookup: {
                from: 'pseries',
                localField: '_id',
                foreignField: '_id',
                as: 'seriesDetails'
            }
        },
        {
            $project: {
                totalCount: 1,
                seriesDetails: { $arrayElemAt: ["$seriesDetails", 0] },
                question: 1
            }
        },
        {
            $addFields: {
                seriesName: "prelims"
            }
        },
        {
            $project: {
                totalCount: 1,
                seriesDetails: {
                    title: 1,
                    description: 1,
                    paymentLink: 1,
                    schedule: 1,
                    price: 1,
                },
                seriesName: 1,
                question: {
                    _id:1,
                    sno: 1,
                    title: 1,
                    description: 1,
                    alottedTime: 1,
                    instruction: 1,
                    nQuestions: 1,
                }
            }
        }
    ])

    const mainsSales = await Msales.aggregate([
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
                from: 'mseriesqpdescs',
                localField: 'series',
                foreignField: 'mSeries',
                as: 'series'
            }
        },
        {
            $addFields: {
                question: "$series"
            }
        },
        {
            $unwind: "$series"
        },
        {
            $group: {
                _id: "$series.mSeries",
                totalCount: { $sum: 1 },
                question: { $first: "$question" }
            }
        },
        {
            $lookup: {
                from: 'mseries',
                localField: '_id',
                foreignField: '_id',
                as: 'seriesDetails'
            }
        },
        {
            $project: {
                totalCount: 1,
                seriesDetails: { $arrayElemAt: ["$seriesDetails", 0] },
                question: 1
            }
        },
        {
            $addFields: {
                seriesName: "mains"
            }
        },
        {
            $project: {
                totalCount: 1,
                seriesDetails: {
                    title: 1,
                    description: 1,
                    paymentLink: 1,
                    schedule: 1,
                    price: 1,
                },
                seriesName: 1,
                question: {
                    _id:1,
                    sno: 1,
                    title: 1,
                    description: 1,
                    alottedTime: 1,
                    instruction: 1,
                    // nQuestions: 1,
                }
            }
        }
    ])


    res.json(
        {
            prelims: prelimsSales,
            mains: mainsSales
            // prelims: ['{title, description, details(file link), question:[{qno(questionPaperNumber),title,description,time,instruction,nQuestion}]}'],
            // mains: ['{title, description, details(file link), question:[{qno(questionPaperNumber),title,description,time,instruction}]}']
        }
    )
});

module.exports = { getPurchasedPapers };