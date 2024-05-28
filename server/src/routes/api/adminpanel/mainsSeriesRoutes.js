const express = require("express");
const router = express.Router();
const mSeriesController = require("../../../controllers/adminpanel/mainsSeriesController");
const { msUpload } = require("../../../util/middleware/imageUpload");
const verifyJWT = require("../../../util/middleware/verifyJWT");
const verifyRoles = require("../../../util/middleware/verifyRoles");
const ROLES_LIST = require("../../../util/roles_list");

router.use(verifyJWT);

router.route("/")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), mSeriesController.getMSerieses)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), msUpload.single('schedule'), mSeriesController.createMSeries);

router.route("/:mid")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), mSeriesController.getMSeries)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), msUpload.single('schedule'), mSeriesController.updateMSeries)
    .delete(verifyRoles(ROLES_LIST.Admin), mSeriesController.deleteMSeries);

router.route("/msingle/:mid")
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), mSeriesController.updatePsStatus);

module.exports = router;