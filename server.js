// importing express
const express = require('express')

// importing authRouters
const authRoute = require('./routes/authRouter')
const productRoute = require('./routes/productRouter')


// app defining
const app = express()

// port defining custom and production
const PORT = process.env.PORT || 5000

// using routes
app.get('/', (req, res) => res.send('Home'))
app.use('/api', authRoute);
app.use('/api', productRoute);

// app running
app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`))
// app.listen(PORT, () => {console.log('server is running on ', {PORT})})


