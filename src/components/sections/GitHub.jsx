import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { staggerContainer, fadeUp } from '../../hooks/useScrollReveal'

// Simulate a contribution grid (visual only — not live data)
function ContributionGrid() {
  const weeks = 26
  const days = 7
  const cells = []
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      const rand = Math.random()
      let level = 0
      if (rand > 0.7) level = 1
      if (rand > 0.82) level = 2
      if (rand > 0.92) level = 3
      if (rand > 0.97) level = 4
      cells.push({ week: w, day: d, level })
    }
  }

  const levelColors = [
    'bg-bg-card border-border-subtle',
    'bg-accent-primary/25 border-accent-primary/30',
    'bg-accent-primary/45 border-accent-primary/40',
    'bg-accent-primary/70 border-accent-primary/60',
    'bg-accent-primary border-accent-primary',
  ]

  return (
    <div className="overflow-x-auto" role="img" aria-label="Contribution activity visualization">
      <div
        className="grid gap-1 w-max"
        style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)`, gridTemplateRows: `repeat(${days}, 1fr)` }}
      >
        {cells.map((cell, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.001, duration: 0.2 }}
            className={`w-3 h-3 rounded-sm border ${levelColors[cell.level]}`}
          />
        ))}
      </div>
    </div>
  )
}

const githubStats = [
  { label: 'Repositories', value: 'Growing', icon: '📁' },
  { label: 'Main Language', value: 'C / HTML', icon: '💻' },
  { label: 'Focus', value: 'Learning', icon: '🎯' },
  { label: 'Status', value: 'Active', icon: '🟢' },
]

const pinnedRepos = [
  {
    name: 'portfolio',
    desc: 'My personal portfolio — React + Vite + Tailwind CSS + Framer Motion.',
    lang: 'JavaScript',
    langColor: 'bg-yellow-400',
    url: 'https://github.com/usoop071/portfolio',
  },
  {
    name: 'c-learning',
    desc: 'C programming exercises and experiments as I learn the language.',
    lang: 'C',
    langColor: 'bg-gray-400',
    url: 'https://github.com/usoop071/c-learning',
  },
  {
    name: 'web-experiments',
    desc: 'HTML, CSS, and JavaScript experiments while learning web development.',
    lang: 'HTML',
    langColor: 'bg-orange-400',
    url: 'https://github.com/usoop071/web-experiments',
  },
]

export default function GitHub() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="github" className="section-padding" aria-labelledby="github-heading">
      <div className="container-width">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <SectionHeader
            label="GitHub"
            title={<>Code & <span className="gradient-text">Open Source</span></>}
            subtitle="Where my code lives. Mostly learning projects and experiments."
          />

          {/* Stats row */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {githubStats.map((stat) => (
              <div key={stat.label} className="glass-card p-5 text-center">
                <div className="text-2xl mb-2" aria-hidden="true">{stat.icon}</div>
                <div className="font-bold text-text-primary">{stat.value}</div>
                <div className="text-text-muted text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Contribution graph */}
          <motion.div variants={fadeUp} className="glass-card p-6 mb-8">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h3 className="font-semibold text-text-primary flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Activity (Visual Representation)
              </h3>
              <span className="text-text-muted text-xs font-mono">illustration, not live data</span>
            </div>
            <ContributionGrid />
            <div className="flex items-center gap-2 mt-4 justify-end text-xs text-text-muted">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((l) => (
                <div key={l} className={`w-3 h-3 rounded-sm ${['bg-bg-card', 'bg-accent-primary/25', 'bg-accent-primary/45', 'bg-accent-primary/70', 'bg-accent-primary'][l]}`} aria-hidden="true" />
              ))}
              <span>More</span>
            </div>
          </motion.div>

          {/* Pinned repos */}
          <motion.div variants={fadeUp}>
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <span className="text-accent-primary" aria-hidden="true">📌</span>
              Pinned Repositories
              <span className="text-text-muted text-xs font-mono ml-2">(update with your real repos)</span>
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinnedRepos.map((repo) => (
                <motion.a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="glass-card p-5 block hover:border-accent-primary/40 transition-all duration-200 shimmer-overlay"
                  aria-label={`${repo.name} repository: ${repo.desc}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span className="font-mono text-sm font-semibold text-accent-primary">{repo.name}</span>
                  </div>
                  <p className="text-text-secondary text-xs leading-relaxed mb-4">{repo.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`} aria-hidden="true" />
                    <span>{repo.lang}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* GitHub CTA */}
          <motion.div variants={fadeUp} className="mt-8 text-center">
            <a
              href="https://github.com/usoop071"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
              aria-label="View GitHub profile (opens in new tab)"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
