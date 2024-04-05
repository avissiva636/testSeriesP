const express = require("express");
const router = express.Router();
const subjectController = require("../../../controllers/adminpanel/subjectController");

router.route("/").get(subjectController.getSubjects)
    .post(subjectController.createSubject);

router.route("/:id").get(subjectController.getSubject)
    .delete(subjectController.deleteSubject)
    .put(subjectController.updateSubject);


module.exports = router;