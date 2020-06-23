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
            console.log({req})
            let {name, category, price, quantity} = req.body
            let product = await Products.create({name, category, price, quantity})
            // let product = Products.create({name, category, price, quantity}).then(p => console.log({p}))
            res.status(201).json({"data": product})
        }

        /* GET */
        if (req.method === "GET"){

            /* single product */
            if (req.params.id){
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


    /* router.put('/product/:id', productController.updateProduct) */
    updateProduct: async (req, res) => {
        let id = req.params.id
        let {name, category, price, quantity} = req.body

        let product = await Products.findOne({where: {id: id}})

        product.update({name, category, price, quantity})
            .then(data => {
                return res.status(201).json({
                    data
                })
            })
    },


    /* router.delete('/product/:id', productController.deleteProduct) */
    deleteProduct: (req, res) => {
        let id = req.params.id

        try {
            Products.destroy({where: {id: id}})
            res.status(200).json({"message": `product {${id}} deleted`})
        }
        catch (e) {
            res.json({"error": e})
        }
    },
}


