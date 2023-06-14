const express = require('express')
const router = express.Router()
const controllers = require('../controllers/department')
const middlewares = require('../middlewares/department') 

router.post('/departments', middlewares.validateCreateDepartments, controllers.createDepartment)
router.get('/departments', controllers.listDepartment)
router.delete('/departments/:dept_no', controllers.deleteDepartment)
router.put('/departments/:dept_no', middlewares.validateUpdateDepartments, controllers.updateDepartment)

module.exports = router;