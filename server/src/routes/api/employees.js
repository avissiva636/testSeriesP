const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeeController');
const verifyRoles = require('../../util/middleware/verifyRoles');
const ROLES_LIST = require('../../util/roles_list');

router.route('/')
    .get(employeeController.getEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.createEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee);

router.route('/:id').
    get(employeeController.getEmployee);

module.exports = router;