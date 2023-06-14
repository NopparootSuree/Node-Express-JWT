const express = require('express')
const router = express.Router()
const controllers = require('../controllers/employees')
const middlewares = require('../middlewares/employee') 

router.post('/controllers', middlewares.validateCreateEmployees, controllers.createEmployees)
router.get('/controllers', controllers.listEmployee)
router.delete('/controllers/:emp_no', controllers.deleteEmployee)
router.put('/controllers/:emp_no', middlewares.validateUpdateEmployees, controllers.updateEmployee)

module.exports = router;