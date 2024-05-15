const express = require("express");
const router = express.Router();
const pQuestionController = require("../../../controllers/adminpanel/pQuestionController");

router.route("/")
    .get(pQuestionController.getAllPsQuestions)
    .post(pQuestionController.createPsQuestion)

router.route("/:pqid")
    .get(pQuestionController.getPsQuestion)
    .put(pQuestionController.updatePsQuestion)

module.exports = router;

