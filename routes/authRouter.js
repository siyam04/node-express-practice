/*==================================== IMPORTING =============================*/
// packages
const express = require('express')
const {body} = require('express-validator')

// custom controllers
const authController = require('../controllers/authController')

/*==================================== CREATING ROUTER =============================*/
const router = express.Router()

/*==================================== ROUTES =============================*/
// 1. Registration (POST) // express-validator added
router.post('/register', [
    body('username').isString(),
    body('password').isLength({min: 8}),
    body('email').isEmail(),
    body('firstName').isString(),
    body('firstName').isString()
], authController.register)

// 2. Login (POST) // express-validator added
router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({min: 8})
], authController.login)

// router.post('/logout', authController.logout)

/*==================================== EXPORTING ROUTES =============================*/
module.exports = router



