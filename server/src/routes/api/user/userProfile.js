const express = require("express");
const router = express.Router();
const uProfileController = require("../../../controllers/user/uProfileController");

router.route("/:uid")
    .get(uProfileController.getProfileDetail)
    .post(uProfileController.updateProfileDetail);

router.route("/email/:uid")
    .put(uProfileController.emailUpdateVerfication);

router.route("/password/:uid")
    .put(uProfileController.passwordUpdate);

module.exports = router;