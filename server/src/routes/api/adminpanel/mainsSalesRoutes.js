const express = require("express");
const router = express.Router();
const mSalesController = require("../../../controllers/adminpanel/mainsSalesController");
const verifyJWT = require("../../../util/middleware/verifyJWT");
const verifyRoles = require("../../../util/middleware/verifyRoles");
const ROLES_LIST = require("../../../util/roles_list");

router.use(verifyJWT);

router.route("/")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), mSalesController.getAllmSales)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), mSalesController.createMainsSale);

router.route("/conditional")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), mSalesController.getConditionalmSales);

router.route("/:msid")
    .delete(verifyRoles(ROLES_LIST.Admin), mSalesController.deleteMSales);

module.exports = router;