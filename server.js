/*====================================IMPORTING=============================*/
// importing packages
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// importing custom authRouters
const authRoute = require('./routes/authRouter')
const productRoute = require('./routes/productRouter')
const cartRoute = require('./routes/cartRouter')

/*====================================SYSTEM INTEGRATION=============================*/
const app = express()
const PORT = process.env.PORT || 5001

/*====================================USE PACKAGES===================================*/
app.use(bodyParser.json())
app.use(cors())

/*====================================USE CUSTOM ROUTERS=============================*/
// template config
app.set("view engine", "ejs")

// home route with template
app.get("/", (req, res) => res.render("home"));

// other api routes
app.use('/api', authRoute);
app.use('/api', productRoute);
app.use('/api', cartRoute);

/*====================================RUN SERVER===================================*/
app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`))
// app.listen(PORT, () => {console.log('server is running on ', {PORT})})


