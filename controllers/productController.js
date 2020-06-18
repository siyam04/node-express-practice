module.exports = {

    productCreate: (req, res) => {
        res.status(201).json({
            "name": "product-1",
            "category": "electronics",
            "price": 500,
            "quantity": 10
        })
    },

    products: (req, res) => {
        res.status(200).json({
            "name": "product-1",
            "category": "electronics",
            "price": 500,
            "quantity": 10
        })
    },

    productDetails: (req, res) => {
        res.status(200).json({
            "name": "product-1",
            "category": "electronics",
            "price": 500,
            "quantity": 10
        })
    },

}