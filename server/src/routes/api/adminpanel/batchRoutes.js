const express = require("express");
const router = express.Router();
const batchController = require("../../../controllers/adminpanel/batchController");
const verifyJWT = require("../../../util/middleware/verifyJWT");
const verifyRoles = require("../../../util/middleware/verifyRoles");
const ROLES_LIST = require("../../../util/roles_list");

router.use(verifyJWT);

router.route("/").get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), batchController.getBatches)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), batchController.createBatch);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), batchController.getBatch)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), batchController.updateBatch)
    .delete(verifyRoles(ROLES_LIST.Admin), batchController.deleteBatch);


module.exports = router;