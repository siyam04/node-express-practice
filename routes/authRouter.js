/*==================================== IMPORTING =============================*/
// packages
const express = require('express')

// custom controllers
const authController = require('../controllers/authController')

// custom validators
const authValidation = require('../validators/authValidation')

/*==================================== CREATING ROUTER =============================*/
const router = express.Router()

/*==================================== ROUTES =============================*/
// 1. Registration (POST) // express-validator added
router.route('/register').post(authValidation.registrationValidation, authController.register)

// 2. Login (POST) // express-validator added
router.route('/login').post(authValidation.loginValidation, authController.login)

// router.post('/logout', authController.logout)

/*==================================== EXPORTING ROUTES =============================*/
module.exports = router