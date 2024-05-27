const express = require("express");
const settingController = require("../../../controllers/adminpanel/settingController");
const router = express.Router();
const verifyJWT = require("../../../util/middleware/verifyJWT");

router.use(verifyJWT);

router.route("/dashboard").get(settingController.getDashboard);

router.route("/profile")
    .get(settingController.getProfile)
    .post(settingController.createProfile)
    .put(settingController.updateProfile)
    .delete(settingController.deleteProfile);

module.exports = router;