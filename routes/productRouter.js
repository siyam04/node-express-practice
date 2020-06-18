// importing express
const express = require('express')

// creating router
const router = express.Router()

// importing controllers
const productController = require('../controllers/productController')


// routes
router.post('/product/create', productController.productCreate)
router.get('/products', productController.products)
router.get('/product/:id', productController.productDetails)

// exporting routes
module.exports = router

