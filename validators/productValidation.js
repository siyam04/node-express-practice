/*==================================== IMPORTING =============================*/
// packages
const {body} = require('express-validator')

/*==================================== FIELDS =============================*/
// 3. Create Product (POST)
exports.createProductValidation = [
    body('name').isString().withMessage('must be string'),
    body('category').isString().withMessage('must be string'),
    body('price').isFloat().withMessage('must be float'),
    body('quantity').isNumeric().withMessage('must be numeric'),
    body('description').isString().withMessage('must be string'),
    body('imageUrl').isBase64().withMessage('must be base64')
]

// 6. Edit Product (PUT)
exports.editProductValidation = [
    body('name').isString().withMessage('must be string'),
    body('category').isString().withMessage('must be string'),
    body('price').isFloat().withMessage('must be float'),
    body('quantity').isNumeric().withMessage('must be numeric'),
    body('description').isString().withMessage('must be string'),
    body('imageUrl').isBase64().withMessage('must be base64')
]