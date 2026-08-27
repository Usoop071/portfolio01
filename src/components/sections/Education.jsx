import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { staggerContainer, fadeUp, slideLeft } from '../../hooks/useScrollReveal'

export default function Education() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="education" className="section-padding" aria-labelledby="education-heading">
      <div className="container-width">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <SectionHeader
            label="Education"
            title={<>Where I <span className="gradient-text">Study</span></>}
            subtitle="My formal academic background. Most of my tech knowledge comes from self-directed learning alongside school."
          />

          <div className="max-w-2xl mx-auto space-y-6">

            {/* Current education card */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="glass-card p-8 border border-accent-primary/20 relative overflow-hidden"
            >
              {/* Glow top-left */}
              <div
                className="absolute -top-10 -left-10 w-40 h-40 bg-accent-primary/10 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="flex items-start gap-5">
                  {/* School icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 border border-border-subtle flex items-center justify-center text-2xl flex-shrink-0" aria-hidden="true">
                    🎓
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h3 className="font-bold text-text-primary text-xl leading-tight">Class 11 / +2</h3>
                        <p className="text-accent-primary font-medium mt-0.5">NIST College</p>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                        Current
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-text-secondary">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Lainchaur, Kathmandu, Nepal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>Class 11 · Section D15</span>
                      </div>
                    </div>

                    <p className="mt-4 text-text-secondary text-sm leading-relaxed">
                      While my formal coursework covers subjects like Mathematics and Physics, most of what I know about programming, Linux, and networking comes from independent exploration outside of class hours.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Self-learning card */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="glass-card p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-accent-secondary/20 border border-border-subtle flex items-center justify-center text-xl flex-shrink-0" aria-hidden="true">
                  📚
                </div>
                <div>
                  <h3 className="font-bold text-text-primary mb-1">Self-Directed Learning</h3>
                  <p className="text-accent-secondary text-sm font-medium mb-2">Ongoing · Since before school</p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Documentation, tutorials, open-source code, YouTube deep dives, and breaking things until they work. This is where most of the real learning happens.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {['C Programming', 'Linux', 'Web Dev', 'Networking', 'Cybersecurity'].map((t) => (
                      <span key={t} className="tag-pill text-[11px]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Future goals */}
            <motion.div variants={fadeUp} className="glass-card p-6 border border-dashed border-border-subtle">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg" aria-hidden="true">🔭</span>
                <h3 className="font-bold text-text-primary">Looking Ahead</h3>
                <span className="ml-auto text-xs text-text-muted font-mono">Future</span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                After completing +2, I plan to pursue a degree in Computer Science or a related field — with a focus on systems, security, or software engineering. For now, I'm building a solid foundation by doing things hands-on.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
