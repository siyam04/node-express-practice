// importing express
const express = require('express')

// creating router
const router = express.Router()

// importing controllers
const productController = require('../controllers/productController')


// routes
router.post('/products', productController.product)
router.get('/products', productController.product)
router.get('/product/:id', productController.product)

// exporting routes
module.exports = router


