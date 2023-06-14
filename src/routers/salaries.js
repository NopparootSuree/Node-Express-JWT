const express = require('express')
const router = express.Router()
const controllers = require('../controllers/salaries')
const middlewares = require('../middlewares/salaries')
const JWTMiddleware = require('../middlewares/jsonWebToken')
require('dotenv').config();

const jwtMiddleware = JWTMiddleware(process.env.JWT_SECRET_KEY);

router.post('/salaries', jwtMiddleware, middlewares.validateCreateSalaries, controllers.createSalaries)
router.get('/salaries', jwtMiddleware, controllers.listSalaries)
router.delete('/salaries/:emp_no', jwtMiddleware, controllers.deleteSalaries)
router.put('/salaries/:emp_no', jwtMiddleware, middlewares.validateUpdateSalaries, controllers.updateSalaries)

module.exports = router;