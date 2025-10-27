const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api', userRoutes)

app.listen(PORT, () => {
  console.log(`Neural server linked on port ${PORT}`)
})