import { motion } from 'framer-motion'

const AnimatedBackground = () => {
  return (
    <>
      {/* Animated Gradient (Unchanged) */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-deep-violet via-electric-blue to-neon-cyan opacity-20"
        animate={{
          background: [
            'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #16213e 100%)',
            'linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0a0a0a 100%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Neural Network Lines (Unchanged) */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-neon-cyan/20 opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              transform: `rotate(${Math.random() * 90}deg)`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>

      {/* UPDATED: Data Stream Particles + Binary Rain */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.05 }}
          />
        ))}
        {/* Binary Rain */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            className="absolute text-xs font-mono text-neon-cyan opacity-40"
            style={{ left: `${i * 4}%`, top: '100%' }}
            animate={{ y: ['100%', '-100%'] }}
            transition={{ duration: 5 + i * 0.2, repeat: Infinity }}
          >
            101010
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AnimatedBackground