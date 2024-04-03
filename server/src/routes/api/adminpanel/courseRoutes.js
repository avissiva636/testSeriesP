const express = require("express");
const router = express.Router();
const courseController = require("../../../controllers/adminpanel/courseController");

router.route("/").get(courseController.getCourses)
    .post(courseController.createCourse);

router.get("/:id", courseController.getCourse);


module.exports = router;