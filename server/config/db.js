const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB neural core')
  } catch (error) {
    console.error('DB connection error:', error)
    process.exit(1)
  }
}

module.exports = connectDB