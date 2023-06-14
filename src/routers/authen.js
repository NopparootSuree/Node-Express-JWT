const express = require('express')
const router = express.Router()
const controllers = require('../controllers/authen')
const middlewares = require('../middlewares/authen') 

router.post('/register', middlewares.validateRegisterUsers, controllers.registerUsers)
router.post('/login', controllers.login)

module.exports = router;