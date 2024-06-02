const express = require("express");
const router = express.Router();
const uProgressController = require("../../../controllers/user/uProgressController");

router.get("/prelims/:uid", uProgressController.getPrelimProgressDescriptions);

router.get("/mains/:uid", uProgressController.getMainsProgressDescriptions);

router.get("/:category/:qno", uProgressController.getProgressPaper);

module.exports = router;