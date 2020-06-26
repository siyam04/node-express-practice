/*====================================IMPORTING=============================*/
// importing packages
const express = require('express')
const bodyParser = require('body-parser')

// importing custom authRouters
const authRoute = require('./routes/authRouter')
const productRoute = require('./routes/productRouter')
const cartRoute = require('./routes/cartRouter')


/*====================================SYSTEM INTEGRATION=============================*/
const app = express()
const PORT = process.env.PORT || 5000

/*====================================USE PACKAGES===================================*/
app.use(bodyParser.json())

/*====================================USE CUSTOM ROUTERS=============================*/
app.get('/', (req, res) => res.send('Home')) // home
app.use('/api', authRoute);
app.use('/api', productRoute);
app.use('/api', cartRoute);

/*====================================RUN SERVER===================================*/
app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`))
// app.listen(PORT, () => {console.log('server is running on ', {PORT})})


