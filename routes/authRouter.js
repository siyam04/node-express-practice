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
    body('username').isAlphanumeric().withMessage('must be alphaNumeric'),
    body('password').isLength({min: 8}).withMessage('must be at least 8 characters long'),
    body('email').isEmail().withMessage('must be a valid email address'),
    body('firstName').isString().withMessage('must be string'),
    body('firstName').isString().withMessage('must be string'),
], authController.register)

// 2. Login (POST) // express-validator added
router.post('/login', [
    body('email').isEmail().withMessage('must be a valid email address'),
    body('password').isLength({min: 8}).withMessage('must be at least 8 characters long'),
], authController.login)

// router.post('/logout', authController.logout)

/*==================================== EXPORTING ROUTES =============================*/
module.exports = router



