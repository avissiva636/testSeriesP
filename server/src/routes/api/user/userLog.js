const express = require("express");
const router = express.Router();
const userLogController = require("../../../controllers/user/userLogController");

router.post("/postRegister", userLogController.postRegisterUser);

router.post("/register", userLogController.registerUser);

router.post("/login", userLogController.loginUser);

module.exports = router;