const express = require('express')
const router = express.Router()
const controllers = require('../controllers/dept_emp')
const middlewares = require('../middlewares/dept_emp') 

router.post('/dept_emp', middlewares.validateCreateDeptNo, controllers.createDeptEmp)
router.get('/dept_emp', controllers.listDeptEmp)

module.exports = router;