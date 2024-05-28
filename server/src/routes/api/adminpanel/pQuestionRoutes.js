const express = require("express");
const router = express.Router();
const pQuestionController = require("../../../controllers/adminpanel/pQuestionController");
const verifyJWT = require("../../../util/middleware/verifyJWT");
const verifyRoles = require("../../../util/middleware/verifyRoles");
const ROLES_LIST = require("../../../util/roles_list");

router.use(verifyJWT);

router.route("/")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), pQuestionController.getAllPsQuestions)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), pQuestionController.createPsQuestion)

router.route("/:pqid")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), pQuestionController.getPsQuestion)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), pQuestionController.updatePsQuestion)

module.exports = router;

