const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
// const Authentication = require('../middlewares/authentication.js')

router.get('/', UserController.findAll)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

// router.use(Authentication)
router.use('/userdata', UserController.getUserDetail)

module.exports = router;