const express = require("express");
const router = express.Router();
const mSeriesController = require("../../../controllers/adminpanel/mainsSeriesController");
const { msUpload } = require("../../../util/middleware/imageUpload");
const verifyJWT = require("../../../util/middleware/verifyJWT");

router.use(verifyJWT);

router.route("/")
    .get(mSeriesController.getMSerieses)
    .post(msUpload.single('schedule'), mSeriesController.createMSeries);

router.route("/:mid")
    .get(mSeriesController.getMSeries)
    .put(msUpload.single('schedule'), mSeriesController.updateMSeries)
    .delete(mSeriesController.deleteMSeries);

router.route("/msingle/:mid")
    .put(mSeriesController.updatePsStatus);

module.exports = router;