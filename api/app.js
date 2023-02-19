//require libraries

const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const mongoose = require('mongoose')
const router = require('./routers/authRoutes')
const userRoutes = require('./routers/userRoutes')
const productRoutes = require('./routers/productsRoutes')
const errorHandler = require('./middleware/error')
const productSupRouter = require('./routers/productSupRouter')
const cartRoutes = require('./routers/cartRoutes')
const orderRoutes = require('./routers/orderRoutes')
require('dotenv').config()
const cors = require('cors')


app.use(cookieParser())
//error handling middleware
app.use(errorHandler)
//json middleware

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))
//router middleware
app.use('/api/v1', router)
app.use('/api/v1', userRoutes)
app.use('/api/v1', productRoutes)
app.use('/api/v1', productSupRouter)
app.use('/api/v1', cartRoutes)
app.use('/api/v1', orderRoutes)

//connect to the data base
const connect = async () => {
    try {
        await mongoose.connect(process.env.mongo_uri)
        console.log('connected to the data base')
    }
    catch (error) {
        throw Error(error)
    }
}
const PORT = process.env.PORT
app.listen(PORT, () => {
    connect();
    console.log(`listenend on port ${PORT}`)
})

