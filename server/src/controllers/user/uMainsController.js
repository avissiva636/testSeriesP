const asyncHandler = require("express-async-handler");
// const { employeeModel: Employee } = require('../../database/index');

//@desc Get All Mains papers, Paid details of user
//@route GET /user/mains/:uid ,{uid,uname}
//access private
const getMainsPapers = asyncHandler(async (req, res) => {
    const { uid, uname } = req.body;
    const paramuid = req.params.uid;

    console.log('req body', uid, uname);
    console.log('paramuid', paramuid);

    res.json(
        {
            paid: ['{ title, description, details(file link), question: [{ qno, title, description, time, instruction }] }'],
            mains: ['{ title, description, payHere(link), details(file link), fee }']
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
//qno questionPaperNumber, 
// sanswer picture
    console.log(qno, title, sanswer);
    console.log('paramuid', req.params.qno);

    res.json(
        {
            message: "proceeded"
        }
    )
});


module.exports = { getMainsPapers, getMainsPaper, submitMainsPaper };