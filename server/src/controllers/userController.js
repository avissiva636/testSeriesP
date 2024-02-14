const asyncHandler = require("express-async-handler");
const { userModel: User } = require("../database/index");
const { APP_SECRET,RFRESH_TOKEN_SECRET } = require("../config/index");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register the User
//@route GET /api/users/register
//access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        return res.sendStatus(409); //Conflict        
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword });
    if (user) {        
        res.status(201).json({ 'success': `New user ${user.username} created!` });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }    
});

//@desc loginHandler
//@route GET /api/users/login
//access public

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const foundUser = await User.findOne({ username });

    // compare password with hashedPassword
    if (foundUser && await bcrypt.compare(password, foundUser.password)) {
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            APP_SECRET,
            { expiresIn: '10min' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            RFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        await foundUser.save();        

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });        
    } else {
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

module.exports = { registerUser, loginUser };