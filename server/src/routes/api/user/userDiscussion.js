const express = require("express");
const router = express.Router();
const uDiscussionController = require("../../../controllers/user/uDiscussionController");

router.get("/:uid", uDiscussionController.getDiscussionResults);

router.get("/:category/:qno", uDiscussionController.getDiscussionPaper);

module.exports = router;