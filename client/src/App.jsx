import { useState } from 'react'
import RegistrationForm from './components/RegistrationForm'
import AnimatedBackground from './components/AnimatedBackground'
import './styles/ai-theme.css'
import { motion } from 'framer-motion';

function App() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [accessCode, setAccessCode] = useState('')

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">  {/* CHANGED: min-h-screen, no overflow-hidden */}
      <AnimatedBackground />
      <RegistrationForm 
        onSuccess={(code) => { setAccessCode(code); setIsSuccess(true); }} 
        onError={(err) => setError(err)}
        isSuccess={isSuccess}
        error={error}
        setError={setError}
        setIsSuccess={setIsSuccess}
        accessCode={accessCode}
      />
      {/* NEW: Scroll Indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.div
          className="w-6 h-6 border-b-2 border-r-2 border-neon-cyan rotate-45 animate-bounce"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
    </div>
  )
}

export default App