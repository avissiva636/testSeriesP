const asyncHandler = require("express-async-handler");
// const { employeeModel: Employee } = require('../../database/index');

//@desc Get All progress prelims, Mains and Scheduled paper
//@route GET /user/progress/:uid ,
//access private
const getProgressResults = asyncHandler(async (req, res) => {

    const paramuid = req.params.uid;

    console.log('paramuid', paramuid);

    res.json(
        {
            prelims: ['{title,description,nQuestions, cAnswer, wAnswer, Marks}'],
            mains: ['{title,description,nQuestions, cAnswer, wAnswer, Marks}'],
            scheduled: ['{title,description,nQuestions, cAnswer, wAnswer, Marks}']
        }
    )
});

//@desc Get specific progress paper prelims, Mains and Scheduled paper
//@route GET /user/progress/:category/:qno ,
//access private
const getProgressPaper = asyncHandler(async (req, res) => {

    const paramQno = req.params.qno;
    const paramCategory = req.params.category;

    console.log('paramuid', paramQno);
    console.log('paramCategory', paramCategory);

    res.json(
        {
            qAttended: [`qno`],
            questions: [`qno, difficulty, analysis('true' / 'false')`]
        }
    )
});

module.exports = { getProgressResults, getProgressPaper };