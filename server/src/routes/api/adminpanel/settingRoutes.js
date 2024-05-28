const express = require("express");
const settingController = require("../../../controllers/adminpanel/settingController");
const router = express.Router();
const verifyJWT = require("../../../util/middleware/verifyJWT");
const verifyRoles = require("../../../util/middleware/verifyRoles");
const ROLES_LIST = require("../../../util/roles_list");

router.use(verifyJWT);

router.route("/dashboard").get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), settingController.getDashboard);

router.route("/profile")
    .get(verifyRoles(ROLES_LIST.Admin), settingController.getProfile)
    .post(verifyRoles(ROLES_LIST.Admin), settingController.createProfile)
    .put(verifyRoles(ROLES_LIST.Admin), settingController.updateProfile)
    .delete(verifyRoles(ROLES_LIST.Admin), settingController.deleteProfile);

module.exports = router;