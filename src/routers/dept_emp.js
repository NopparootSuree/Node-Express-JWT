const express = require('express')
const router = express.Router()
const controllers = require('../controllers/dept_emp')
const middlewares = require('../middlewares/dept_emp')
const JWTMiddleware = require('../middlewares/jsonWebToken')
require('dotenv').config();

const jwtMiddleware = JWTMiddleware(process.env.JWT_SECRET_KEY);

router.post('/dept_emp', jwtMiddleware, middlewares.validateCreateDeptNo, controllers.createDeptEmp)
router.get('/dept_emp', jwtMiddleware, controllers.listDeptEmp)

module.exports = router;