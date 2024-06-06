const asyncHandler = require("express-async-handler");
const { StudentModel } = require("../../database/index");
const { uACCESS_TOKEN_SECRET, UATIME } = require("../../config/index");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register the User
//@route GET /user/log/register
//access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, age, sex, mobile, telephone } = req.body;
    if (!username || !email || !password || !age || !sex || !mobile) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const studentAvailable = await StudentModel.findOne({ email });

    if (studentAvailable) {
        return res.sendStatus(409); //Conflict        
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createStudent = await StudentModel.create({
        name: username, age, sex,
        userName: username, password: hashedPassword,
        email, mobile, telephone: telephone ? telephone : undefined
    });
    if (createStudent) {
        res.status(201).json({ 'success': `New user ${createStudent.userName} created!` });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

//@desc loginHandler
//@route GET /user/log/login
//access public
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const foundUser = await StudentModel.findOne({ userName: username });
    // compare password with hashedPassword
    if (foundUser && await bcrypt.compare(password, foundUser.password)) {
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.userName,
                    "userId": foundUser._id,
                }
            },
            uACCESS_TOKEN_SECRET,
            { expiresIn: `${UATIME}` }
        );

        res.cookie('jwt', accessToken, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
        res.json({ message: 'proceeded', userid: foundUser._id, username: foundUser.userName });
    } else {
        res.status(401);
        throw new Error("username or password is not valid");
    }
});

module.exports = { registerUser, loginUser };