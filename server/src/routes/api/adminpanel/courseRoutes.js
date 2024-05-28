const express = require("express");
const router = express.Router();
const courseController = require("../../../controllers/adminpanel/courseController");
const verifyJWT = require("../../../util/middleware/verifyJWT");
const verifyRoles = require("../../../util/middleware/verifyRoles");
const ROLES_LIST = require("../../../util/roles_list");

router.use(verifyJWT);

router.route("/").get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),courseController.getCourses)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),courseController.createCourse);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),courseController.getCourse)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),courseController.updateCourse)
    .delete(verifyRoles(ROLES_LIST.Admin),courseController.deleteCourse);


module.exports = router;