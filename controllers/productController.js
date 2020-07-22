/*==================================== IMPORTING =============================*/
// packages
const {validationResult} = require('express-validator')

// custom models
const Products = require('./../models').Products

/*==================================== CONTROLLERS =============================*/
module.exports = {
    /*
    3. Create Product (POST) // express-validator added
    4. Product List (GET)
    5. Product Details (GET)
    */
    product: async (req, res) => {
        /* 3 */
        if (req.method === "POST") {

            // express-validator
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors.array()})
            }
            // express-validator END

            let {name, category, price, quantity, imageUrl, description} = req.body
            let product = await Products.create({name, category, price, quantity, imageUrl, description})
            res.status(201).json({"data": product})
        }

        if (req.method === "GET") {
            /* 4 */
            if (req.params.id) {
                let id = req.params.id
                // returns array
                // Products.findAll({where: {id: id}}).then(data => {return res.status(200).json({data})})

                // returns object
                Products.findOne({where: {id: id}})
                    .then(data => {
                        return res.status(200).json({
                            data
                        })
                    })
            }

            /* 5 */
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


    /* async await */
    /* 6. Edit Product (PUT) // express-validator added */
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


    /* promise */
    /* 6. Edit Product (PUT) // express-validator added */
    updateProduct: (req, res) => {

        // express-validator
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()})
        }
        // express-validator END

        let id = req.params.id
        let {name, category, price, quantity, imageUrl, description} = req.body

        Products.findOne({where: {id: id}})
            .then(product_obj_arg => {
                product_obj_arg.update({name, category, price, quantity, imageUrl, description})
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


    /* 7. Delete Product (DELETE) */
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


