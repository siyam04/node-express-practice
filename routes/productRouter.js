/* importing express */
const express = require('express')
const {body} = require('express-validator')

/* creating router */
const router = express.Router()

/* importing controllers */
const productController = require('../controllers/productController')
const auth_middleware = require('../middlewares/auth')


/* routes */
// express-validator added
router.post('/product', 
[
    body('name').isString().withMessage('Name will be string'),
    body('category').isString().withMessage('Category will be string'),
    body('price').isFloat().withMessage('Price will be Float'),
    body('quantity').isNumeric().withMessage('Quantity will be Numeric'),
    body('description').isString().withMessage('Description will be string') 
],
 productController.product)

router.get('/product', productController.product)

router.get('/product/:id', productController.product)

// express-validator added
router.put('/product/:id', [
    body('name').isString(),
    body('category').isString(),
    body('price').isFloat(),
    body('quantity').isNumeric(),
    body('description').isString()
], productController.updateProduct)

router.delete('/product/:id', auth_middleware.Auth, productController.deleteProduct)


/* exporting routes */
module.exports = router


