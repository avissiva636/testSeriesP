const express = require("express");
const router = express.Router();
const batchController = require("../../../controllers/adminpanel/batchController");

router.route("/").get(batchController.getBatches)
    .post(batchController.createBatch);

router.route("/:id").get(batchController.getBatch)
    .put(batchController.updateBatch)
    .delete(batchController.deleteBatch);


module.exports = router;