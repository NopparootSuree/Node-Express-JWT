const express = require('express')
const router = express.Router()
const controllers = require('../controllers/dept_manager')
const middlewares = require('../middlewares/dept_manager') 
const JWTMiddleware = require('../middlewares/jsonWebToken')
require('dotenv').config();

const jwtMiddleware = JWTMiddleware(process.env.JWT_SECRET_KEY);

router.post('/dept_manager', jwtMiddleware, middlewares.validateCreateDeptManager, controllers.createDeptManager)
router.get('/dept_manager', jwtMiddleware, controllers.listDeptManager)

module.exports = router;