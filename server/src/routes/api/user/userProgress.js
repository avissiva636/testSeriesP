const express = require("express");
const router = express.Router();
const uProgressController = require("../../../controllers/user/uProgressController");
const validateToken = require("../../../util/middleware/validateTokenHandler");

router.use(validateToken);
router.get("/prelims/:uid", uProgressController.getPrelimProgressDescriptions);

router.get("/mains/:uid", uProgressController.getMainsProgressDescriptions);

router.get("/prelimProgress/:qno", uProgressController.getPrelimsProgressResult);

module.exports = router;