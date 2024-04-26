const express = require("express");
const router = express.Router();
const studentController = require("../../../controllers/adminpanel/studentController");

router.route("/")
    .get(studentController.getStudents)
    .post(studentController.createStudent);

router.route("/:sid")
    .get(studentController.getSpecificStudent)
    .put(studentController.updateStudent)
    .delete(studentController.deleteStudent);

module.exports = router;