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
    body('name').isString().withMessage('must be string'),
    body('category').isString().withMessage('must be string'),
    body('price').isFloat().withMessage('must be float'),
    body('quantity').isNumeric().withMessage('must be numeric'),
    body('description').isString().withMessage('must be string'),
    body('imageUrl').isBase64().withMessage('must be base64')
], productController.product)

// 4. Product List (GET)
router.get('/product', productController.product)

// 5. Product Details (GET)
router.get('/product/:id', productController.product)

// 6. Edit Product (PUT) // express-validator added
router.put('/product/:id', [
    body('name').isString().withMessage('must be string'),
    body('category').isString().withMessage('must be string'),
    body('price').isFloat().withMessage('must be float'),
    body('quantity').isNumeric().withMessage('must be numeric'),
    body('description').isString().withMessage('must be string'),
    body('imageUrl').isBase64().withMessage('must be base64')
], productController.updateProduct)

// 7. Delete Product (DELETE)
router.delete('/product/:id', auth_middleware.Auth, productController.deleteProduct)

/*==================================== EXPORTING ROUTES =============================*/
module.exports = router


