const express = require('express')
const router = express.Router()
const controllers = require('../controllers/salaries')
const middlewares = require('../middlewares/salaries') 

router.post('/salaries', middlewares.validateCreateSalaries, controllers.createSalaries)
router.get('/salaries', controllers.listSalaries)
router.delete('/salaries/:emp_no', controllers.deleteSalaries)
router.put('/salaries/:emp_no', middlewares.validateUpdateSalaries, controllers.updateSalaries)

module.exports = router;