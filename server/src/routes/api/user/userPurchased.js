const express = require("express");
const router = express.Router();
const uPurchasedController = require("../../../controllers/user/uPurchasedController");

router.get("/:uid", uPurchasedController.getPurchasedPapers);

module.exports = router;