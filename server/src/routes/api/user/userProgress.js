const express = require("express");
const router = express.Router();
const uProgressController = require("../../../controllers/user/uProgressController");

router.get("/:uid", uProgressController.getProgressResults);

router.get("/:category/:qno", uProgressController.getProgressPaper);

module.exports = router;