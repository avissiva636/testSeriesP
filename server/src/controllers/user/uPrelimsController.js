const asyncHandler = require("express-async-handler");
// const { employeeModel: Employee } = require('../../database/index');

//@desc Get All prelims papers, Paid details of user
//@route GET /user/prelims/:uid ,{uid,uname}
//access private
const getPrelimsPapers = asyncHandler(async (req, res) => {
    const { uid, uname } = req.body;
    const paramuid = req.params.uid;

    console.log('req body', uid, uname);
    console.log('paramuid', paramuid);

    res.json(
        {
            paid: [`{title(sn), description, details(file link), question:[{qno,title,description,time,instruction,nQuestion}]}]}`],
            prelims: [`{title(sn), description, payHere(link), details(file link), fee}`]
        }
    )
});


//@desc Get specific Prelims question paper
//@route GET /user/prelims/exam/:qno ,{uid,uname}
//access private
const getPrelimsPaper = asyncHandler(async (req, res) => {
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

//@desc Submit prelims exam paper
//@route POST /user/prelims/exam/:qno ,{{qno(questionPaperNumber),title(sn),sanswer[{qsn:sOption}]}}
//access private
const submitPrelimsPaper = asyncHandler(async (req, res) => {
    console.log("body", req.body);
    const { qno, title, sanswer } = req.body;

    console.log(qno, title, sanswer);
    console.log('paramuid', req.params.qno);

    res.json(
        {
            message: "proceeded"
        }
    )
});

module.exports = { getPrelimsPapers, getPrelimsPaper, submitPrelimsPaper };