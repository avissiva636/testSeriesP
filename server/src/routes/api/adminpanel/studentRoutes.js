const express = require("express");
const router = express.Router();
const studentController = require("../../../controllers/adminpanel/studentController");
const verifyJWT = require("../../../util/middleware/verifyJWT");

router.use(verifyJWT);

router.route("/")
    .get(studentController.getStudents)
    .post(studentController.createStudent);

router.route("/unCondition")
    .get(studentController.getAllStudents);

router.route("/:sid")
    .get(studentController.getSpecificStudent)
    .put(studentController.updateStudent)
    .delete(studentController.deleteStudent);

module.exports = router;