const express = require('express');
const router = express.Router();
const uPrelimsController = require('../../../controllers/user/uPrelimsController');
const validateToken = require('../../../util/middleware/validateTokenHandler');

router.use(validateToken);
router.route('/:uid').get(uPrelimsController.getPrelimsPapers);

router.route('/prelimAttempt/:uid').get(uPrelimsController.getPrelimAttempt);

router.route('/exam/:qno')
    .get(uPrelimsController.getPrelimsPaper)
    .post(uPrelimsController.submitPrelimsPaper);




module.exports = router;