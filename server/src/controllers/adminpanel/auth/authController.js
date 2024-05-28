const { adminModel: Admin } = require('../../../database/index');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { AACCESS_TOKEN_SECRET, AREFRESH_TOKEN_SECRET } = require('../../../config');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await Admin.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);

        // create JWTs
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

        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            AREFRESH_TOKEN_SECRET,
            { expiresIn: '15s' }
        );

        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        res.cookie('testSeries', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.testSeries) return res.sendStatus(204);

    const refreshToken = cookies.testSeries;

    const foundUser = await Admin.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('testSeries', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204);
    }

    // Delete refreshToken in DB
    foundUser.refreshToken = '';
    await foundUser.save();

    res.clearCookie('testSeries', { httpOnly: true, sameSite: 'None', secure: true })
    return res.sendStatus(204);
}

module.exports = { handleLogin, handleLogout };