const express = require('express')
const router = express.Router()
const { validateEmployees, createEmployees } = require('../controllers/employees')

router.post('/employee', validateEmployees, createEmployees)

module.exports = router;