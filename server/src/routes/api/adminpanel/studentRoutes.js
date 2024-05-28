const express = require("express");
const router = express.Router();
const studentController = require("../../../controllers/adminpanel/studentController");
const verifyJWT = require("../../../util/middleware/verifyJWT");
const verifyRoles = require("../../../util/middleware/verifyRoles");
const ROLES_LIST = require("../../../util/roles_list");

router.use(verifyJWT);

router.route("/")
    .get(verifyRoles(ROLES_LIST.Admin), studentController.getStudents)
    .post(verifyRoles(ROLES_LIST.Admin), studentController.createStudent);

router.route("/unCondition")
    .get(verifyRoles(ROLES_LIST.Admin), studentController.getAllStudents);

router.route("/:sid")
    .get(verifyRoles(ROLES_LIST.Admin), studentController.getSpecificStudent)
    .put(verifyRoles(ROLES_LIST.Admin), studentController.updateStudent)
    .delete(verifyRoles(ROLES_LIST.Admin), studentController.deleteStudent);

module.exports = router;