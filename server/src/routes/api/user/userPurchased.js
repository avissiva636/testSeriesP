const express = require("express");
const router = express.Router();
const uPurchasedController = require("../../../controllers/user/uPurchasedController");
const validateToken = require("../../../util/middleware/validateTokenHandler");

router.use(validateToken);
router.get("/:uid", uPurchasedController.getPurchasedPapers);

module.exports = router;