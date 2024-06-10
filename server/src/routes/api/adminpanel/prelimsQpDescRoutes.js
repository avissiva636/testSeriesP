const express = require("express");
const router = express.Router();
const prelimsQpDescController = require("../../../controllers/adminpanel/prelimsQpDescController");
const { dataflow, psDescUpload } = require("../../../util/middleware/imageUpload");
const verifyJWT = require("../../../util/middleware/verifyJWT");
const verifyRoles = require("../../../util/middleware/verifyRoles");
const ROLES_LIST = require("../../../util/roles_list");

router.use(verifyJWT);

router.route("/").get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), prelimsQpDescController.getAllPQpDescs)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), psDescUpload.single('schedule'), prelimsQpDescController.createPQpDesc);

router.route("/:id")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), prelimsQpDescController.getAllSpecificPQpDescs)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), psDescUpload.single('schedule'), prelimsQpDescController.updatePQpDesc)

router.route("/pSingle/:id")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), prelimsQpDescController.getPQpDesc)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), dataflow.any(), prelimsQpDescController.updatePQpDescStatus)
    .delete(verifyRoles(ROLES_LIST.Admin), prelimsQpDescController.deletePQpDesc);

router.route("/pResult/:pDescId")
.get(verifyRoles(ROLES_LIST.Admin),prelimsQpDescController.getSpecifcPrelimResult)

module.exports = router;