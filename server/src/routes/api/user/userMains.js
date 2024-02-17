const express = require('express');
const router = express.Router();
const uMainsController = require('../../../controllers/user/uMainsController');

// /user/prelims
router.route('/:uid').get(uMainsController.getMainsPapers);

router.route('/exam/:qno')
    .get(uMainsController.getMainsPaper)
    .post(uMainsController.submitMainsPaper);




module.exports = router;