/* importing packages */
const {validationResult} = require('express-validator')

/* importing custom Models */
const Products = require('./../models').Products

/* Controllers */
module.exports = {
    /*
    router.post('/product', productController.product) (POST)
    router.get('/product', productController.product) (GET)
    router.get('/product/:id', productController.product) (GET)
    */
    product: async (req, res) => {
        /* CREATE */
        if (req.method === "POST") {

            // express-validator
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors.array()})
            }
            // express-validator END

            let {name, category, price, quantity, description} = req.body
            let product = await Products.create({name, category, price, quantity, description})
            // let product = Products.create({name, category, price, quantity}).then(p => console.log({p}))
            res.status(201).json({"data": product})
        }

        /* GET */
        if (req.method === "GET") {

            /* single product */
            if (req.params.id) {
                let id = req.params.id
                /* returns array */
                // Products.findAll({where: {id: id}}).then(data => {return res.status(200).json({data})})

                /* returns object */
                Products.findOne({where: {id: id}})
                    .then(data => {
                        return res.status(200).json({
                            data
                        })
                    })
            }

            /* all products */
            else {
                Products.findAll({})
                    .then(data => {
                            return res.status(200).json({
                                data
                            })
                        }
                    )
            }
        }
    },


    /* system-1 */
    // /* router.put('/product/:id', productController.updateProduct) */
    // updateProduct: async (req, res) => {
    //     let id = req.params.id
    //     let {name, category, price, quantity} = req.body
    //
    //     let product = await Products.findOne({where: {id: id}})
    //
    //     product.update({name, category, price, quantity})
    //         .then(data => {
    //             return res.status(201).json({
    //                 data
    //             })
    //         })
    // },


    /* system-2 */
    /* router.put('/product/:id', productController.updateProduct) */
    updateProduct: (req, res) => {
        // express-validator
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()})
        }
        // express-validator END

        let id = req.params.id
        let {name, category, price, quantity, description} = req.body

        Products.findOne({where: {id: id}})
            .then(product_obj_arg => {
                product_obj_arg.update({name, category, price, quantity, description})
                    .then(product_obj_arg_2 => {
                        return res.status(201).json({
                            data: product_obj_arg_2
                        })
                    }).catch(error_inner_then => {
                    return res.status(204).json({error_inner_then})
                })
            }).catch(error_outer_then => {
            return res.status(204).json({error_outer_then})
        })

    },


    deleteProduct: (req, res) => {
        const id = req.params.id

        Products.destroy({where: {id: id}})
            .then(product => {
                return res.status(200).json({
                    "message": `${id} deleted`
                })
            }).catch(error => {
            return res.status(400).json({"error": error})
        })
    }// deleteProduct
}


