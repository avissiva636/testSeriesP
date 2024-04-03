const express = require("express");
const router = express.Router();
const subjectController = require("../../../controllers/adminpanel/subjectController");

router.route("/").get(subjectController.getSubjects)
    .post(subjectController.createSubject);

router.get("/:id", subjectController.getSubject);


module.exports = router;