const express = require("express");
const router = express.Router();
const settingController = require("../../../controllers/adminpanel/settingController");

router.route("/dashboard").get(settingController.getDashboard);

router.route("/profile")
    .get(settingController.getProfile)
    .post(settingController.createProfile)
    .put(settingController.updateProfile)
    .delete(settingController.deleteProfile);

module.exports = router;