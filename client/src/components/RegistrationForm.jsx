import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, User, CheckCircle, AlertCircle, Loader2, MapPin, Calendar, BadgeCheck } from 'lucide-react'
import Lottie from 'react-lottie-player'
import axios from 'axios'

const RegistrationForm = ({ onSuccess, onError, isSuccess, error, setError, setIsSuccess, accessCode }) => {
  const API_BASE = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({ name: '', email: '' })
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef(null)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required (please use your real name)'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) return 'Invalid email format'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post(`${API_BASE}/api/register`, formData);
      onSuccess(response.data.code)
      speak(`Access code generated: ${response.data.code}. See you at the workshop!`)
      setFormData({ name: '', email: '' })
    } catch (err) {
      onError(err.response?.data?.message || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1.2
      speechSynthesis.speak(utterance)
    }
  }

  // Workshop Details
  const workshop = {
    title: "How AI Agents Are Revolutionizing Businesses, Build Your Own AI Agent Live!",
    location: "Gutech University, Korangi Creek, Karachi",
    date: "Thursday, November 13th, 2-3 PM",
    free: true
  }

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      {/* AI Avatar Corner */}
      <motion.div 
        className="absolute top-4 left-4 w-12 h-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
      >
        <Lottie
          loop
          play
          style={{ width: 48, height: 48 }}
          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
        />
      </motion.div>

      {/* Workshop Details Banner */}
      <motion.div 
        className="glassmorphism rounded-2xl p-6 w-full max-w-2xl text-center shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ border: '1px solid rgba(0, 245, 255, 0.3)' }}
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-electric-blue to-neon-cyan bg-clip-text text-transparent font-orbitron"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {workshop.title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <motion.div 
            className="glassmorphism rounded-xl p-4 flex items-center space-x-3 hover:bg-neon-cyan/10 transition-all duration-300"
            whileHover={{ y: -5, rotateX: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <MapPin className="h-6 w-6 text-electric-blue" />
            <div>
              <p className="text-sm font-semibold text-neon-cyan">Location</p>
              <p className="text-white text-sm">{workshop.location}</p>
            </div>
          </motion.div>
          <motion.div 
            className="glassmorphism rounded-xl p-4 flex items-center space-x-3 hover:bg-neon-cyan/10 transition-all duration-300"
            whileHover={{ y: -5, rotateX: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Calendar className="h-6 w-6 text-electric-blue" />
            <div>
              <p className="text-sm font-semibold text-neon-cyan">Date & Time</p>
              <p className="text-white text-sm">{workshop.date}</p>
            </div>
          </motion.div>
          <motion.div 
            className="glassmorphism rounded-xl p-4 flex items-center space-x-3 hover:bg-neon-cyan/10 transition-all duration-300"
            whileHover={{ y: -5, rotateX: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <BadgeCheck className="h-6 w-6 text-electric-blue" />
            <div className="text-center">
              <p className="text-sm font-semibold text-neon-cyan">Entry</p>
              <motion.span 
                className="inline-block px-3 py-1 bg-gradient-to-r from-electric-blue to-neon-cyan text-black font-bold rounded-full text-sm mt-1"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                FREE
              </motion.span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Form */}
      <motion.div
        ref={formRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glassmorphism rounded-2xl p-8 w-full max-w-md shadow-2xl"
        style={{ border: '1px solid rgba(0, 245, 255, 0.2)' }}
      >
        <motion.h1 
          className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-electric-blue to-neon-cyan bg-clip-text text-transparent font-orbitron"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          Secure Your Spot
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div 
            className="relative"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <User className="absolute left-3 top-3 h-5 w-5 text-neon-cyan" />
            <input
              type="text"
              name="name"
              placeholder="Full Name (use your real name)"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg glassmorphism text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue animation-glow"
              required
              autoFocus
            />
          </motion.div>

          <motion.div 
            className="relative"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Mail className="absolute left-3 top-3 h-5 w-5 text-neon-cyan" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg glassmorphism text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue animation-glow"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-electric-blue to-neon-cyan text-black font-bold shadow-lg hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <Loader2 className="animate-spin mx-auto h-5 w-5" />
            ) : (
              'Register Now'
            )}
          </motion.button>
        </form>

        {/* Success Modal with Access Code & Workshop Recap */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setIsSuccess(false)}
            >
              <motion.div 
                className="glassmorphism rounded-2xl p-8 text-center max-w-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Particle Burst Checkmark */}
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 text-electric-blue animation-particle-burst relative overflow-hidden"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: 1 }}
                >
                  <CheckCircle size={64} />
                  {/* Confetti Particles */}
                  <div className="absolute inset-0">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-neon-cyan rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ x: Math.random() * 100 - 50, y: Math.random() * 100 - 50, opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </motion.div>
                <h2 className="text-2xl font-orbitron mb-2 text-electric-blue">Registration Complete!</h2>
                
                {/* Access Code Display */}
                <motion.div 
                  className="bg-gradient-to-r from-deep-violet to-electric-blue rounded-lg p-4 mb-6 shadow-glow"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  <p className="text-neon-cyan font-semibold mb-2">Your Access Code</p>
                  <p className="text-3xl font-bold text-white tracking-wider">{accessCode}</p>
                  <p className="text-sm text-gray-300 mt-2">Remember this for entry at the workshop location!</p>
                  <button 
                    onClick={() => navigator.clipboard.writeText(accessCode)}
                    className="mt-2 px-4 py-1 bg-neon-cyan/20 rounded text-neon-cyan text-sm hover:bg-neon-cyan/40"
                  >
                    Copy Code
                  </button>
                </motion.div>

                {/* Workshop Recap */}
                <div className="space-y-2 text-left text-sm">
                  <p className="text-white flex items-center justify-center space-x-2"><Calendar className="h-4 w-4" /><span>{workshop.date}</span></p>
                  <p className="text-white flex items-center justify-center space-x-2"><MapPin className="h-4 w-4" /><span>{workshop.location}</span></p>
                  <p className="text-electric-blue flex items-center justify-center space-x-2"><BadgeCheck className="h-4 w-4" /><span>FREE Event</span></p>
                </div>

                <motion.button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 px-6 py-2 bg-neon-cyan/20 rounded-lg text-neon-cyan hover:bg-neon-cyan/40"
                  whileHover={{ scale: 1.05 }}
                >
                  Close & Prepare
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Popup */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 right-4 bg-red-500/20 border border-red-500/50 rounded-lg p-4 max-w-sm z-50"
            >
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="text-white">{error}</p>
              </div>
              <button 
                onClick={() => setError('')}
                className="ml-auto text-white hover:text-red-200"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default RegistrationForm