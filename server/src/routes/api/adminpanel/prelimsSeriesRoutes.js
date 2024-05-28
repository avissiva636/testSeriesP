const express = require("express");
const router = express.Router();
const pSeriesController = require("../../../controllers/adminpanel/prelimsSeriesController");
const { psUpload } = require("../../../util/middleware/imageUpload");
const verifyJWT = require("../../../util/middleware/verifyJWT");
const verifyRoles = require("../../../util/middleware/verifyRoles");
const ROLES_LIST = require("../../../util/roles_list");

router.use(verifyJWT);

router.route("/")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), pSeriesController.getPSerieses)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), psUpload.single('schedule'), pSeriesController.createPSeries);

router.route("/:pid")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), pSeriesController.getPSeries)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), psUpload.single('schedule'), pSeriesController.updatePSeries)
    .delete(verifyRoles(ROLES_LIST.Admin), pSeriesController.deletePSeries);

router.route("/psingle/:pid")
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), pSeriesController.updatePsStatus)

module.exports = router;