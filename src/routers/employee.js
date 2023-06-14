const express = require('express')
const router = express.Router()
const controllers = require('../controllers/employees')
const middlewares = require('../middlewares/employee') 

router.post('/employees', middlewares.validateCreateEmployees, controllers.createEmployees)
router.get('/employees', controllers.listEmployee)
router.delete('/employees/:emp_no', controllers.deleteEmployee)
router.put('/employees/:emp_no', middlewares.validateUpdateEmployees, controllers.updateEmployee)

module.exports = router;