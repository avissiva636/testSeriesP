const express = require("express");
const router = express.Router();
const mSeriesController = require("../../../controllers/adminpanel/mainsSeriesController");
const { msUpload } = require("../../../util/middleware/imageUpload");

router.route("/")
    .get(mSeriesController.getMSerieses)
    .post(msUpload.single('schedule'), mSeriesController.createMSeries);

router.route("/:mid")
    .get(mSeriesController.getMSeries)
    .put(msUpload.single('schedule'), mSeriesController.updateMSeries)
    .delete(mSeriesController.deleteMSeries);

module.exports = router;