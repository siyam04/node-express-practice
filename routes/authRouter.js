// importing express
const express = require('express')

// creating router
const router = express.Router()

// importing controllers
const authController = require('../controllers/authController')


// routes
router.post('/register', authController.register)
router.post('/login', authController.login)
// router.post('/logout', authController.logout)

// exporting routes
module.exports = router

