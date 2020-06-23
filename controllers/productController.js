// importing custom Models
const Products = require('./../models').Products


// Controllers
module.exports = {
    product: (req, res) => {
        // create product (POST)
        if (req.method === "POST") {
            console.log({req})

            let {name, category, price, quantity} = req.body
            let product = Products.create({name, category, price, quantity}).then(p => console.log({p}))

            res.status(201).json({
                "message": "created",
                "data": product
            })
        }

        // get single product/all product (GET)
        if (req.method === "GET"){
            // id ID
            if (req.params.id){
                let id = req.params.id
                Products.findAll({where: {id: id}}).then(data => {return res.status(200).json({data})})
            }

            // if NOT ID
            else {Products.findAll({}).then(data => {return res.status(200).json({data})})}
        }

    },// main
}


