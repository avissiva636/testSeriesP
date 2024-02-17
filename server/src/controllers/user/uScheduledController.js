const asyncHandler = require("express-async-handler");
// const { employeeModel: Employee } = require('../../database/index');

//@desc Get Scheduled exam result
//@route GET /user/schedule/:uid ,{uid,uname}
//access private
const getScheduledResult = asyncHandler(async (req, res) => {    
    const paramuid = req.params.uid;
    
    console.log('paramuid', paramuid);

    res.json(
        { scheduledTest: ['{ title, desciption, RankList, Discussion(dont need) }'] }
    )
});

module.exports = { getScheduledResult };