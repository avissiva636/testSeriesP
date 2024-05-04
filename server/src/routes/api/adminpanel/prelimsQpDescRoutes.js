const express = require("express");
const router = express.Router();
const prelimsQpDescController = require("../../../controllers/adminpanel/prelimsQpDescController");

router.route("/").get(prelimsQpDescController.getAllPQpDescs)
    .post(prelimsQpDescController.createPQpDesc);

router.route("/:id").get(prelimsQpDescController.getAllSpecificPQpDescs)

router.route("/pSingle/:id")
    .get(prelimsQpDescController.getPQpDesc)
    .put(prelimsQpDescController.updatePQpDesc)
    .delete(prelimsQpDescController.deletePQpDesc);

module.exports = router;