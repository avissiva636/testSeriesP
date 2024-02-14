const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../../config/index");

const validateToken = asyncHandler(async (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        // return res.sendStatus(401);
        res.status(401);
        throw new Error("User UnAuthorized");
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(
        token,
        APP_SECRET,
        (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )

});

module.exports = validateToken;