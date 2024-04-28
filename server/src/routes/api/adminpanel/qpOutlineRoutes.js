const express = require("express");
const router = express.Router();
const qpOutlineController = require("../../../controllers/adminpanel/qpOutlineController");

router.route("/").get(qpOutlineController.getQpOutlines)
    .post(qpOutlineController.createQpOutline);

router.route("/:id").get(qpOutlineController.getQpOutline)
    .put(qpOutlineController.updateQpOutline)
    .delete(qpOutlineController.deleteQpOutline);


module.exports = router;