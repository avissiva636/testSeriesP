const asyncHandler = require("express-async-handler");
// const { employeeModel: Employee } = require('../../database/index');

//@desc Get All Archive prelims, Mains and Scheduled paper
//@route GET /user/archive/:uid ,
//access private
const getArchivePaper = asyncHandler(async (req, res) => {

    const paramuid = req.params.uid;

    console.log('paramuid', paramuid);

    res.json(
        {
            prelims: ['{sTitle, qno, qTitle, description, nQuestions, timeAlloted, attemptsCompleted}'],
            mains: ['sTitle, qno, qTitle, description, nQuestions, timeAlloted, attemptsCompleted'],
            scheduled: ['sTitle, qno, qTitle, description, nQuestions, timeAlloted, attemptsCompleted']
        }
    )
});



module.exports = { getArchivePaper };