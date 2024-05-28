const express = require("express");
const router = express.Router();
const subjectController = require("../../../controllers/adminpanel/subjectController");
const verifyJWT = require("../../../util/middleware/verifyJWT");
const verifyRoles = require("../../../util/middleware/verifyRoles");
const ROLES_LIST = require("../../../util/roles_list");

router.use(verifyJWT);

router.route("/").get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), subjectController.getSubjects)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), subjectController.createSubject);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), subjectController.getSubject)
    .delete(verifyRoles(ROLES_LIST.Admin), subjectController.deleteSubject)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), subjectController.updateSubject);

module.exports = router;