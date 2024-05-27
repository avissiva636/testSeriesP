const express = require("express");
const router = express.Router();
const pSalesController = require("../../../controllers/adminpanel/prelimSalesController");
const verifyJWT = require("../../../util/middleware/verifyJWT");

router.use(verifyJWT);

router.route("/")
    .get(pSalesController.getAllpSales)
    .post(pSalesController.createPrelimSale);

router.route("/conditional")
    .get(pSalesController.getConditionalpSales);

router.route("/:psid")
    .delete(pSalesController.deletepSales);

module.exports = router;