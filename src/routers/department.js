const express = require('express')
const router = express.Router()
const controllers = require('../controllers/department')
const middlewares = require('../middlewares/department') 
const JWTMiddleware = require('../middlewares/jsonWebToken')
require('dotenv').config();

const jwtMiddleware = JWTMiddleware(process.env.JWT_SECRET_KEY);

router.post('/departments', jwtMiddleware, middlewares.validateCreateDepartments, controllers.createDepartment)
router.get('/departments', jwtMiddleware, controllers.listDepartment)
router.delete('/departments/:dept_no', jwtMiddleware, controllers.deleteDepartment)
router.put('/departments/:dept_no', jwtMiddleware, middlewares.validateUpdateDepartments, controllers.updateDepartment)

module.exports = router;