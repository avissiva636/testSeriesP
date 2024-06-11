const express = require('express');
const router = express.Router();
const uMainsController = require('../../../controllers/user/uMainsController');
const { uMainsUpload } = require("../../../util/middleware/uImageUpload");
const validateToken = require('../../../util/middleware/validateTokenHandler');
// /user/prelims
router.use(validateToken);
router.route('/:uid').get(uMainsController.getMainsPapers);

router.route('/mainsAttempt/:uid').get(uMainsController.getMainsAttempt);

router.route('/exam')
    .get(uMainsController.getMainsPaper)
    .post(uMainsUpload.single('mainsAnswer'), uMainsController.submitMainsPaper);


module.exports = router;