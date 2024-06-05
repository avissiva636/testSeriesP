const express = require("express");
const router = express.Router();
const uArchiveController = require("../../../controllers/user/uArchiveController");

router.get("/:uid", uArchiveController.getArchivePaper);

router.get("/archiveAttempt/:uid", uArchiveController.getArchiveAttempt);
router.get("/archiveMAttempt/:uid", uArchiveController.getMainsArchiveAttempt);

module.exports = router;