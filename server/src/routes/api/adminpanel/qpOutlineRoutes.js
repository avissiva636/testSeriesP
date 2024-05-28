const express = require("express");
const router = express.Router();
const qpOutlineController = require("../../../controllers/adminpanel/qpOutlineController");
const verifyJWT = require("../../../util/middleware/verifyJWT");
const verifyRoles = require("../../../util/middleware/verifyRoles");
const ROLES_LIST = require("../../../util/roles_list");

router.use(verifyJWT);

router.route("/").get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), qpOutlineController.getQpOutlines)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), qpOutlineController.createQpOutline);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), qpOutlineController.getQpOutline)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), qpOutlineController.updateQpOutline)
    .delete(verifyRoles(ROLES_LIST.Admin), qpOutlineController.deleteQpOutline);


module.exports = router;