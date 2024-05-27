const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/adminpanel/auth/authController');
const refreshTokenController = require('../../../controllers/adminpanel/auth/refreshTokenController');

router.post('/login', authController.handleLogin);
router.get('/logout', authController.handleLogout);
router.post('/refresh', refreshTokenController.handleRefreshToken);

module.exports = router;