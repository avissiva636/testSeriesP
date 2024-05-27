const express = require("express");
const router = express.Router();
const prelimsQpDescController = require("../../../controllers/adminpanel/prelimsQpDescController");
const { dataflow, psDescUpload } = require("../../../util/middleware/imageUpload");
const verifyJWT = require("../../../util/middleware/verifyJWT");

router.use(verifyJWT);

router.route("/").get(prelimsQpDescController.getAllPQpDescs)
    .post(psDescUpload.single('schedule'), prelimsQpDescController.createPQpDesc);

router.route("/:id")
    .get(prelimsQpDescController.getAllSpecificPQpDescs)
    .put(psDescUpload.single('schedule'),  prelimsQpDescController.updatePQpDesc)

router.route("/pSingle/:id")
    .get(prelimsQpDescController.getPQpDesc)
    .put(dataflow.any(), prelimsQpDescController.updatePQpDescStatus)
    .delete(prelimsQpDescController.deletePQpDesc);

module.exports = router;