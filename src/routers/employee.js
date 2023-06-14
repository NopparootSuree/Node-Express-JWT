const express = require('express')
const router = express.Router()
const employee = require('../controllers/employees')
const middleware = require('../middlewares/employee') 

router.post('/employee', middleware.validateCreateEmployees, employee.createEmployees)
router.get('/employee', employee.listEmployee)
router.delete('/employee/:emp_no', employee.deleteEmployee)
router.put('/employee/:emp_no', middleware.validateUpdateEmployees, employee.updateEmployee)

module.exports = router;