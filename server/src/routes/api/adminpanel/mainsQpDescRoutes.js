const express = require("express");
const router = express.Router();
const mainsQpDescController = require("../../../controllers/adminpanel/mainsQpDescController");
const { msDescUpload, msResultCorrectUpload } = require("../../../util/middleware/imageUpload");
const verifyJWT = require("../../../util/middleware/verifyJWT");
const verifyRoles = require("../../../util/middleware/verifyRoles");
const ROLES_LIST = require("../../../util/roles_list");

router.use(verifyJWT);

router.route("/").get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), mainsQpDescController.getAllMQpDescs)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), msDescUpload.single('schedule'), mainsQpDescController.createMQpDesc);

router.route("/:id")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), mainsQpDescController.getAllSpecificMQpDescs)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), msDescUpload.single('schedule'), mainsQpDescController.updateMQpDesc);

router.route("/mSingle/:id")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), mainsQpDescController.getMQpDesc)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), mainsQpDescController.updateMQpDescStatus)
    .delete(verifyRoles(ROLES_LIST.Admin), mainsQpDescController.deleteMQpDesc);

router.route("/mResult/:mDescId")
    .get(verifyRoles(ROLES_LIST.Admin), mainsQpDescController.getSpecifcMainsResult);
router.route("/mSubmit/:uid")
    .put(verifyRoles(ROLES_LIST.Admin), msResultCorrectUpload.single("schedule"), mainsQpDescController.updatecorrectedMainsResult);

module.exports = router;