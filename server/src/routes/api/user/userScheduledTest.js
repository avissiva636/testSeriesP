const express = require("express");
const router = express.Router();
const uScheduledController = require("../../../controllers/user/uScheduledController");

router.get("/result/:uid", uScheduledController.getScheduledResult);

module.exports = router;