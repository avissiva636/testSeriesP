const express = require("express");
const router = express.Router();
const uArchiveController = require("../../../controllers/user/uArchiveController");

router.get("/:uid", uArchiveController.getArchivePaper);


module.exports = router;