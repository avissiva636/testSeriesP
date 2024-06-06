const express = require("express");
const router = express.Router();
const uDiscussionController = require("../../../controllers/user/uDiscussionController");
const validateToken = require("../../../util/middleware/validateTokenHandler");

router.use(validateToken);
router.get("/:uid", uDiscussionController.getDiscussionResults);

router.get("/prelims/:qno", uDiscussionController.getDiscussionPaper);

module.exports = router;