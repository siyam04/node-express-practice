/*==================================== IMPORTING =============================*/
// packages
const express = require('express')

// custom controllers
const categoryController = require('../controllers/categoryController')

/*==================================== CREATING ROUTER =============================*/
const router = express.Router()

/*==================================== ROUTES =============================*/
// 1. Category List (GET)
router.get('/category', categoryController.category)

/*==================================== EXPORTING ROUTES =============================*/
module.exports = router
