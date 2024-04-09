const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeeController');
// const verifyRoles = require('../../util/middleware/verifyRoles');
// const ROLES_LIST = require('../../util/roles_list');

router.route('/')
    .get(employeeController.getEmployees)
    .post(employeeController.createEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

router.route('/:id').
    get(employeeController.getEmployee);

module.exports = router;