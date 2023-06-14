const express = require('express')
const router = express.Router()
const controllers = require('../controllers/dept_manager')
const middlewares = require('../middlewares/dept_manager') 

router.post('/dept_manager', middlewares.validateCreateDeptManager, controllers.createDeptManager)
router.get('/dept_manager', controllers.listDeptManager)

module.exports = router;