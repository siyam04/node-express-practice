module.exports = {

    // register (POST)
    register :(req, res) => {
        console.log({req}) // show all requested data

        let username = req.body.username
        let password = req.body.password
        let email = req.body.email
        let first_name = req.body.first_name
        let last_name = req.body.last_name
        let Token = req.body.Token

        res.status(201).json({
            "message": "registration successful!",
            username, password, email, first_name, last_name, Token
        })
    },

    // login (POST)
    login: (req, res) => {
        let username = req.body.username
        let password = req.body.password

        if (username ===  this.register.username && password === this.register.password){
            res.status(200).json({"message": `login successful for ${username}`})
        }
        else {
            res.status(204).json({"message": `no content for ${username}`})
        }
    },

    // logout (POST)
    logout: (req, res) => {
        let username = req.body.username
        let Token = req.body.Token

        res.status(200).json({"message": `${Token} matched! logout success for ${username}`})
    },
}

