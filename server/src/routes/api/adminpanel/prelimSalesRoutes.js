const express = require("express");
const router = express.Router();
const pSalesController = require("../../../controllers/adminpanel/prelimSalesController");
const verifyJWT = require("../../../util/middleware/verifyJWT");
const verifyRoles = require("../../../util/middleware/verifyRoles");
const ROLES_LIST = require("../../../util/roles_list");

router.use(verifyJWT);

router.route("/")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), pSalesController.getAllpSales)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), pSalesController.createPrelimSale);

router.route("/conditional")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), pSalesController.getConditionalpSales);

router.route("/:psid")
    .delete(verifyRoles(ROLES_LIST.Admin), pSalesController.deletepSales);

module.exports = router;