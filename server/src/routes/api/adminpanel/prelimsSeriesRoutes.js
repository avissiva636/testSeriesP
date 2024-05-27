const express = require("express");
const router = express.Router();
const pSeriesController = require("../../../controllers/adminpanel/prelimsSeriesController");
const { psUpload } = require("../../../util/middleware/imageUpload");
const verifyJWT = require("../../../util/middleware/verifyJWT");

router.use(verifyJWT);

router.route("/")
    .get(pSeriesController.getPSerieses)
    .post(psUpload.single('schedule'), pSeriesController.createPSeries);

router.route("/:pid")
    .get(pSeriesController.getPSeries)
    .put(psUpload.single('schedule'), pSeriesController.updatePSeries)
    .delete(pSeriesController.deletePSeries);

router.route("/psingle/:pid")
    .put(pSeriesController.updatePsStatus)

module.exports = router;