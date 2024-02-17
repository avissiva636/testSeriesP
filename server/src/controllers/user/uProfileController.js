const asyncHandler = require("express-async-handler");
// const { employeeModel: Employee } = require('../../database/index');

//@desc Get profile details
//@route GET /user/profile/:uid ,
//access private
const getProfileDetail = asyncHandler(async (req, res) => {

    const paramuid = req.params.uid;

    console.log('paramuid', paramuid);

    res.json(
        '{ uname, name, age, sex, mobile, emailAddress }'
    )
});


//@desc Update profile details
//@route PUT /user/profile/:uid ,
//access private
const updateProfileDetail = asyncHandler(async (req, res) => {

    const paramuid = req.params.uid;
    const { uname, name, age, sex, mobile } = req.body;

    console.log('paramuid', paramuid);
    console.log(uname, name, age, sex, mobile);

    res.json(
        { message: "proceeded" }
    )
});


//@desc Email  Verification
//@route PUT /user/profile/email/:uid ,
//access private
const emailUpdateVerfication = asyncHandler(async (req, res) => {

    const paramuid = req.params.uid;
    const { uname } = req.body;

    console.log('paramuid', paramuid);
    console.log(uname);

    res.json(
        { message: "proceeded" }
    )
});


//@desc Update password
//@route PUT /user/profile/password/:uid ,
//access private
const passwordUpdate = asyncHandler(async (req, res) => {

    const paramuid = req.params.uid;
    const { uname } = req.body;

    console.log('paramuid', paramuid);
    console.log(uname);

    res.json(
        { message: "proceeded" }
    )
});

module.exports = {
    getProfileDetail, updateProfileDetail,
    emailUpdateVerfication, passwordUpdate
};