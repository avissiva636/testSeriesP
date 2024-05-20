const express = require("express");
const router = express.Router();
const mainsQpDescController = require("../../../controllers/adminpanel/mainsQpDescController");
const { msDescUpload } = require("../../../util/middleware/imageUpload");

router.route("/").get(mainsQpDescController.getAllMQpDescs)
    .post(msDescUpload.single('schedule'), mainsQpDescController.createMQpDesc);

router.route("/:id")
    .get(mainsQpDescController.getAllSpecificMQpDescs)
    .put(msDescUpload.single('schedule'), mainsQpDescController.updateMQpDesc);

router.route("/mSingle/:id")
    .get(mainsQpDescController.getMQpDesc)
    .put(mainsQpDescController.updateMQpDescStatus)
    .delete(mainsQpDescController.deleteMQpDesc);

module.exports = router;