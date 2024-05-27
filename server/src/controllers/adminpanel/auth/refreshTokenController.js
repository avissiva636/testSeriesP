const { AREFRESH_TOKEN_SECRET, AACCESS_TOKEN_SECRET } = require('../../../config');
const { adminModel: Admin } = require('../../../database/index');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {    
    const cookies = req.cookies;
    
    if (!cookies?.testSeries) return res.sendStatus(401);
    const refreshToken = cookies.testSeries;    
    const foundUser = await Admin.findOne({ refreshToken }).exec();    

    if (!foundUser) return res.sendStatus(403); //Forbidden

    jwt.verify(refreshToken,
        AREFRESH_TOKEN_SECRET,
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
                AACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            res.json({ accessToken, user: foundUser.username });
        });
}

module.exports = { handleRefreshToken };