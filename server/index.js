const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();  // Keep this, but handle errors gracefully

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

// NEW: Export for Vercel (don't call listen)
module.exports = app;

// OLD: Comment out or remove for serverless
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Neural server linked on port ${PORT}`);
// });