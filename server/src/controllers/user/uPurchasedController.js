const asyncHandler = require("express-async-handler");
// const { employeeModel: Employee } = require('../../database/index');

//@desc Get All Purchased prelims and Mains paper
//@route GET /user/purchased/:uid ,{uid,uname}
//access private
const getPurchasedPapers = asyncHandler(async (req, res) => {
    const { uid, uname } = req.body;
    const paramuid = req.params.uid;

    console.log('req body', uid, uname);
    console.log('paramuid', paramuid);

    res.json(
        {
            prelims: ['{title, description, details(file link), question:[{qno(questionPaperNumber),title,description,time,instruction,nQuestion}]}'],
            mains: ['{title, description, details(file link), question:[{qno(questionPaperNumber),title,description,time,instruction}]}']
        }
    )
});

module.exports = { getPurchasedPapers };