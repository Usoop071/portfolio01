import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { staggerContainer, fadeUp, slideLeft, slideRight } from '../../hooks/useScrollReveal'

const contacts = [
  {
    label: 'GitHub',
    value: 'usoop071',
    href: 'https://github.com/usoop071',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    color: 'hover:border-gray-400/50 hover:text-gray-200',
    external: true,
  },
  {
    label: 'Email',
    value: 'shahutsab071@gmail.com',
    href: 'mailto:shahutsab071@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'hover:border-accent-primary/50 hover:text-accent-primary',
    external: false,
  },
]

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="contact" className="section-padding" aria-labelledby="contact-heading">
      <div className="container-width">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <SectionHeader
            label="Get In Touch"
            title={<>Let's <span className="gradient-text">Connect</span></>}
          />

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left: intro */}
            <motion.div variants={slideLeft} className="space-y-6">
              <div className="glass-card p-8 relative overflow-hidden">
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 bg-accent-primary/8 rounded-full blur-3xl pointer-events-none"
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    Have an interesting project or idea?
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    I'm always open to learning from others, collaborating on projects, or just talking about technology. Whether it's a cool idea, a question about Linux, or something you want to build — reach out.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    I'm a student, so I can't promise professional turnaround times — but I take things seriously and I'm always genuinely interested in what people are working on.
                  </p>

                  {/* Status badge */}
                  <div className="mt-6 flex items-center gap-3 p-4 bg-bg-card rounded-xl border border-border-subtle">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                    <div>
                      <div className="text-sm font-medium text-text-primary">Currently open to:</div>
                      <div className="text-xs text-text-muted mt-0.5">Collaborations · Learning together · Interesting conversations · Open source contributions</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center text-xl" aria-hidden="true">
                  📍
                </div>
                <div>
                  <div className="font-semibold text-text-primary text-sm">Kathmandu, Nepal</div>
                  <div className="text-text-muted text-xs">GMT+5:45 · Nepal Standard Time</div>
                </div>
              </div>
            </motion.div>

            {/* Right: contact links */}
            <motion.div variants={slideRight} className="space-y-4">
              <p className="text-text-muted text-sm font-mono mb-6">
                // Replace the placeholders below with your actual contact info
              </p>

              {contacts.map((c) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                  whileHover={{ x: 6, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`flex items-center gap-4 p-5 glass-card border border-border-subtle transition-all duration-200 ${c.color} group shimmer-overlay`}
                  aria-label={c.external ? `${c.label}: ${c.value} (opens in new tab)` : `${c.label}: ${c.value}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-bg-card border border-border-subtle flex items-center justify-center text-text-muted group-hover:border-current transition-colors duration-200">
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-text-muted font-mono uppercase tracking-wider mb-0.5">{c.label}</div>
                    <div className="font-mono text-sm text-text-secondary group-hover:text-current transition-colors duration-200 truncate">
                      {c.value}
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 text-text-muted group-hover:text-current transition-all duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              ))}


            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
