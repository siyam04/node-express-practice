/*==================================== IMPORTING =============================*/
// packages
const express = require('express')

// custom controllers
const productController = require('../controllers/productController')
const auth_middleware = require('../middlewares/auth')

// custom validators
const productValidation = require('../validators/productValidation')

/*==================================== CREATING ROUTER =============================*/
const router = express.Router()

/*==================================== ROUTES =============================*/
// 3. Create Product (POST) // express-validator added
router.route('/product').post(productValidation.createProductValidation, productController.product)

// 4. Product List (GET)
router.get('/product', productController.product)

// 5. Product Details (GET)
router.get('/product/:id', productController.product)

// 6. Edit Product (PUT) // express-validator added
router.route('/product/:id').put(productValidation.editProductValidation, productController.updateProduct)

// 7. Delete Product (DELETE)
router.delete('/product/:id', auth_middleware.Auth, productController.deleteProduct)

/*==================================== EXPORTING ROUTES =============================*/
module.exports = router