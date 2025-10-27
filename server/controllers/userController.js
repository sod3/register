const User = require('../models/User')
const crypto = require('crypto')  // Built-in Node.js – no install needed

// @desc    Register new user
// @route   POST /api/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email } = req.body

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' })
    }

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // Generate unique 8-char alphanumeric code (robustified)
    let code
    let attempts = 0
    const maxAttempts = 10  // Prevent infinite loop
    while (!code && attempts < maxAttempts) {
      try {
        code = crypto.randomBytes(4).toString('hex').toUpperCase()  // e.g., A1B2C3D4
        const codeExists = await User.findOne({ registrationCode: code })
        if (!codeExists) {
          break  // Unique, exit loop
        } else {
          code = null  // Reset for retry
        }
      } catch (genErr) {
        console.error('Code gen error:', genErr)
        code = null
      }
      attempts++
    }

    if (!code) {
      return res.status(500).json({ message: 'Failed to generate unique code' })
    }

    console.log('Creating user with code:', code)  // TEMP LOG: Remove after testing

    // Create user
    const user = await User.create({ name, email, registrationCode: code })

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      code: user.registrationCode
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Server error during registration' })
  }
}

module.exports = { registerUser }