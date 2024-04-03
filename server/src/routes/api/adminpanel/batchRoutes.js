const express = require("express");
const router = express.Router();
const batchController = require("../../../controllers/adminpanel/batchController");

router.route("/").get(batchController.getBatches)
    .post(batchController.createBatch);

router.get("/:id", batchController.getBatch);


module.exports = router;