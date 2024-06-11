const express = require("express");
const router = express.Router();
const uScheduledController = require("../../../controllers/user/uScheduledController");
const validateToken = require("../../../util/middleware/validateTokenHandler");

router.use(validateToken);
router.get("/result/:uid", uScheduledController.getScheduledResult);

module.exports = router;