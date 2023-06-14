const express = require('express')
const router = express.Router()
const controllers = require('../controllers/employees')
const middlewares = require('../middlewares/employee')
const JWTMiddleware = require('../middlewares/jsonWebToken')
require('dotenv').config();

const jwtMiddleware = JWTMiddleware(process.env.JWT_SECRET_KEY);

router.post('/employees', jwtMiddleware, middlewares.validateCreateEmployees, controllers.createEmployees)
router.get('/employees', jwtMiddleware, controllers.listEmployee)
router.delete('/employees/:emp_no', jwtMiddleware, controllers.deleteEmployee)
router.put('/employees/:emp_no', jwtMiddleware, middlewares.validateUpdateEmployees, controllers.updateEmployee)

module.exports = router;