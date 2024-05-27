const express = require("express");
const router = express.Router();
const mSalesController = require("../../../controllers/adminpanel/mainsSalesController");
const verifyJWT = require("../../../util/middleware/verifyJWT");

router.use(verifyJWT);

router.route("/")
    .get(mSalesController.getAllmSales)
    .post(mSalesController.createMainsSale);

router.route("/conditional")
    .get(mSalesController.getConditionalmSales);

router.route("/:msid")
    .delete(mSalesController.deleteMSales);

module.exports = router;