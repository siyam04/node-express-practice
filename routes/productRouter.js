/*==================================== IMPORTING =============================*/
// packages
const express = require('express')
const {body} = require('express-validator')

// custom controllers
const productController = require('../controllers/productController')
const auth_middleware = require('../middlewares/auth')

/*==================================== CREATING ROUTER =============================*/
const router = express.Router()

/*==================================== ROUTES =============================*/
// 3. Create Product (POST) // express-validator added
router.post('/product', [
    body('name').isString(),
    body('category').isString(),
    body('price').isFloat(),
    body('quantity').isNumeric(),
    body('description').isString()
], productController.product)

// 4. Product List (GET)
router.get('/product', productController.product)

// 5. Product Details (GET)
router.get('/product/:id', productController.product)

// 6. Edit Product (PUT) // express-validator added
router.put('/product/:id', [
    body('name').isString(),
    body('category').isString(),
    body('price').isFloat(),
    body('quantity').isNumeric(),
    body('description').isString()
], productController.updateProduct)

// 7. Delete Product (DELETE)
router.delete('/product/:id', auth_middleware.Auth, productController.deleteProduct)

/*==================================== EXPORTING ROUTES =============================*/
module.exports = router


