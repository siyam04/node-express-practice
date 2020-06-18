module.exports = {
    register :(req, res) => {
        return res.status(201).json({
            "username": "jakarea",
            "password": "j1234567",
            "email": "jakarea@email.com"
        })
    },

    login: (req, res) => {
        res.status(200).json({
            "username": "jakarea",
            "password": "j1234567",
        })
    },

    logout: (req, res) => {
        res.status(200).json({
            "username": "jakarea",
            "token": "randomtoken",
        })
    },
}

