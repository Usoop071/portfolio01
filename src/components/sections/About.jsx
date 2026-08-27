import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { staggerContainer, fadeUp, slideLeft, slideRight } from '../../hooks/useScrollReveal'

const interests = [
  { icon: '⚙️', label: 'Systems & Linux' },
  { icon: '🔐', label: 'Cybersecurity' },
  { icon: '🌐', label: 'Web Dev' },
  { icon: '🔢', label: 'Mathematics' },
  { icon: '🤖', label: 'Robotics' },
  { icon: '♟️', label: 'Chess' },
  { icon: '🔭', label: 'Physics' },
  { icon: '🌐', label: 'Networking' },
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="about" className="section-padding" aria-labelledby="about-heading">
      <div className="container-width">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <SectionHeader
            label="Who I Am"
            title={<>About <span className="gradient-text">Me</span></>}
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center mt-4">

            {/* Left: Text */}
            <motion.div variants={slideLeft} className="space-y-6">
              <div className="glass-card p-6 border-l-2 border-l-accent-primary">
                <p className="text-text-secondary leading-relaxed text-lg">
                  I'm a <span className="text-text-primary font-medium">Class 11 student</span> at NIST College, Lainchaur, Nepal — but my relationship with technology started well before textbooks.
                </p>
              </div>

              <p className="text-text-secondary leading-relaxed">
                I got into computers because I wanted to understand how things actually work — not just use them. That curiosity led me down a rabbit hole: C programming, Linux distributions, self-hosted servers, DNS records, virtual machines, networking concepts, and web development.
              </p>

              <p className="text-text-secondary leading-relaxed">
                Right now, I'm actively learning C, building websites, and experimenting with Linux environments like Arch and Kali. I run virtual machines, configure Cloudflare DNS, deploy sites on GitHub Pages, and test tools like Wireshark and SSH setups. Cybersecurity and networking are areas I'm particularly drawn to.
              </p>

              <p className="text-text-secondary leading-relaxed">
                Outside of tech, I enjoy <span className="text-text-primary">chess, checkers, sudoku</span>, and digging into mathematics and physics — the kind of problems where logic is the only tool you need.
              </p>

              {/* Terminal callout */}
              <div className="bg-bg-card rounded-xl p-4 border border-border-subtle font-mono text-sm overflow-x-auto">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/70" aria-hidden="true" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/70" aria-hidden="true" />
                    <span className="w-3 h-3 rounded-full bg-green-500/70" aria-hidden="true" />
                  </div>
                  <span className="text-text-muted text-xs">terminal</span>
                </div>
                <div className="space-y-1 text-text-muted">
                  <p><span className="text-accent-primary">~</span> <span className="text-accent-secondary">whoami</span></p>
                  <p className="text-text-secondary">utsab — student, developer, linux enthusiast</p>
                  <p className="mt-2"><span className="text-accent-primary">~</span> <span className="text-accent-secondary">uname -a</span></p>
                  <p className="text-text-secondary">Nepal | Class 11 | NIST College</p>
                  <p className="mt-2"><span className="text-accent-primary">~</span> <span className="text-accent-secondary">echo $STATUS</span></p>
                  <p className="text-green-400">actively learning, always curious</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Stats + Interests */}
            <motion.div variants={slideRight} className="space-y-6">

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '2+', label: 'Years exploring tech', color: 'from-accent-primary to-accent-secondary' },
                  { value: '5+', label: 'Tech domains explored', color: 'from-accent-secondary to-gold-300' },
                  { value: '4+', label: 'Linux distros tried', color: 'from-gold-300 to-accent-primary' },
                  { value: 'NP', label: 'Building from Nepal', color: 'from-accent-primary to-accent-secondary' },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="glass-card p-5 text-center shimmer-overlay"
                  >
                    <div className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-text-muted text-xs leading-tight">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Interests */}
              <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4 font-mono">
                  Interests & Hobbies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map(({ icon, label }) => (
                    <motion.span
                      key={label}
                      whileHover={{ y: -2, scale: 1.05 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-bg-card border border-border-subtle text-text-secondary hover:text-text-primary hover:border-accent-primary transition-all duration-200 cursor-default"
                    >
                      <span aria-hidden="true">{icon}</span>
                      {label}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Location card */}
              <motion.div
                whileHover={{ y: -2 }}
                className="glass-card p-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center text-2xl flex-shrink-0">
                  🇳🇵
                </div>
                <div>
                  <div className="font-semibold text-text-primary">Kathmandu, Nepal</div>
                  <div className="text-text-muted text-sm">
                    NIST College, Lainchaur · Class 11 D15
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
