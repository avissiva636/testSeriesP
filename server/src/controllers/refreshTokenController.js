const asyncHandler = require("express-async-handler");
const { userModel: User } = require("../database/index");
const { APP_SECRET, RFRESH_TOKEN_SECRET } = require("../config/index");

const jwt = require('jsonwebtoken');

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        res.status(401);
        throw new Error("User UnAuthorized");
    }
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden

    jwt.verify(refreshToken,
        RFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
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
            res.json({ accessToken });

        });

});

module.exports = { handleRefreshToken };