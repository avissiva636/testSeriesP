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
            scheduled:['{title, description, subject, nQuestions, timeAlloted}']
        }
    )
});

module.exports = { getDiscussionResults };