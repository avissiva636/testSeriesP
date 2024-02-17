const express = require("express");
const router = express.Router();
const uDiscussionController = require("../../../controllers/user/uDiscussionController");

router.get("/:uid", uDiscussionController.getDiscussionResults);

module.exports = router;