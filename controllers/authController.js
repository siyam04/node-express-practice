/* importing custom Models */
const User = require('./../models').User


/* Controllers */
module.exports = {

    /* router.post('/register', authController.register) (POST) */
    register : async (req, res) => {
        console.log({req})

        let {username, password, email, first_name, last_name} = req.body

        let user = await User.create({username, password, email, first_name, last_name})

        res.status(201).json({
            "data": user
        })
    },

    /* router.post('/login', authController.login) (POST) */
    // login: (req, res) => {
    //     let username = req.body.username
    //     let password = req.body.password
    //
    //     if (username ===  this.register.username && password === this.register.password){
    //         res.status(200).json({"message": `login successful for ${username}`})
    //     }
    //     else {
    //         res.status(204).json({"message": `no content for ${username}`})
    //     }
    // },

    /* router.post('/logout', authController.logout) (POST) */
//     logout: (req, res) => {
//         let username = req.body.username
//         let Token = req.body.Token
//
//         res.status(200).json({"message": `${Token} matched! logout success for ${username}`})
//     },
}

