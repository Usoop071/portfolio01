import { motion } from 'framer-motion'
import { fadeUp } from '../../hooks/useScrollReveal'

export default function SectionHeader({ label, title, subtitle, className = '' }) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {label && (
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-accent-primary bg-accent-glow border border-border-subtle mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" aria-hidden="true" />
          {label}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
