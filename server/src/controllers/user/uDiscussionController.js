const asyncHandler = require("express-async-handler");
// const { employeeModel: Employee } = require('../../database/index');

//@desc Get All discussion prelims, Mains and Scheduled paper
//@route GET /user/discussion/:uid ,
//access private
const getDiscussionResults = asyncHandler(async (req, res) => {

    const paramuid = req.params.uid;

    console.log('paramuid', paramuid);

    res.json(
        {
            prelims: ['{title, description, subject, nQuestions, timeAlloted}'],
            mains: ['{title, description, subject, nQuestions, timeAlloted}]}'],
            scheduled: ['{title, description, subject, nQuestions, timeAlloted}']
        }
    )
});

//@desc Get specific discussion paper prelims, Mains and Scheduled paper
//@route GET /user/discussion/:category/:qno ,
//access private
const getDiscussionPaper = asyncHandler(async (req, res) => {

    const paramQno = req.params.qno;
    const paramCategory = req.params.category;

    console.log('paramuid', paramQno);
    console.log('paramCategory', paramCategory);

    res.json(
        {
            aPaper: ['qNumber, question, options: { option1, option2, option3, option4 }, cOption, explanation']
        }
    )
});

module.exports = { getDiscussionResults, getDiscussionPaper };