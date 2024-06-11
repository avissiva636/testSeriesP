const asyncHandler = require("express-async-handler");
const { StudentModel, userModel } = require("../../database/index");
const { uACCESS_TOKEN_SECRET, UATIME } = require("../../config/index");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../adminpanel/emailContoller");

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

//@desc Register the User
//@route GET /user/log/postRegister
//access public
const postRegisterUser = asyncHandler(async (req, res) => {
    const { userId, otp: otpReceived } = req.body;
    if (!userId || !otpReceived) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    // console.log(username, email, password, age, sex, mobile, telephone)
    // const studentAvailable = await StudentModel.findOne({ email });
    const userAvailable = await userModel.findById(userId);
    let createdUser = null;
    if (userAvailable?.otp === parseInt(otpReceived, 10)) {
        createdUser = await StudentModel.create({
            name: userAvailable?.name, age: userAvailable?.age,
            sex: userAvailable?.sex, userName: userAvailable?.userName,
            password: userAvailable?.password, email: userAvailable?.email,
            mobile: userAvailable?.mobile, telephone: userAvailable?.telephone,
        })
    }
    else {
        return res.sendStatus(409); //Conflict
    }

    if (createdUser) {
        res.status(201).json({ "message": "succeed" });
    } else {
        res.status(400);
        throw new Error("Invalid Otp");
    }
});

//@desc Register the User
//@route GET /user/log/register
//access public
const registerUser = asyncHandler(async (req, res) => {
    const { name: username, email, password, age, sex, mobile, telephone } = req.body;
    if (!username || !email || !password || !age || !sex || !mobile) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    // console.log(username, email, password, age, sex, mobile, telephone)
    const studentAvailable = await StudentModel.findOne({ email });

    if (studentAvailable) {
        return res.sendStatus(409); //Conflict        
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    const createdUser = await userModel.create({
        name: username, age, sex,
        userName: username, password: hashedPassword,
        email, mobile, telephone: telephone ? telephone : undefined,
        otp
    })

    if (createdUser) {
        const subject = 'Your OTP Code';
        const text = `Your OTP code is ${otp}. It will expire in 10 minutes.`;
        const html = `<p>Your OTP code is <b>${otp}</b>. It will expire in 10 minutes.</p>`;
        sendMail({ to: email, subject, text, html }).then(info => {
            res.status(201).json({ userId: createdUser._id });
        })
            .catch(error => {
                res.status(400).json({ message: "Invalid Mail" })
            });
    }
    else {
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
        if (foundUser?.status === "approved") {
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
        }
        else {
            res.status(401);
            throw new Error("unApproved");
        }
    } else {
        res.status(401);
        throw new Error("username or password is not valid");
    }
});

module.exports = { postRegisterUser, registerUser, loginUser };