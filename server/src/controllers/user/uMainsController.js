const asyncHandler = require("express-async-handler");
const { mSalesModel: Msales, mQpDesModel: mQpDescription } = require('../../database/index');

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
    const { qno, title, sanswer } = req.body;

    console.log(qno, title, sanswer);
    console.log('paramuid', req.params.qno);

    res.json(
        {
            message: "proceeded"
        }
    )
});


module.exports = { getMainsPapers, getMainsPaper, submitMainsPaper };