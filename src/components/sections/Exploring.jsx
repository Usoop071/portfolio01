import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { staggerContainer, fadeUp } from '../../hooks/useScrollReveal'

const explorations = [
  {
    icon: '⚡',
    title: 'C Deep Dive',
    desc: 'Working through pointers, memory management, and writing clean C. The goal is to understand what higher-level languages abstract away.',
    progress: 'Active',
    color: 'from-yellow-500 to-orange-500',
    tags: ['C', 'Pointers', 'Memory', 'Algorithms'],
  },
  {
    icon: '🔐',
    title: 'Network Security',
    desc: 'Studying how networks are attacked and defended. Using Wireshark to analyze traffic, exploring basic reconnaissance, and learning security fundamentals on Kali Linux.',
    progress: 'Exploring',
    color: 'from-red-500 to-rose-500',
    tags: ['Kali Linux', 'Wireshark', 'Networking', 'CTFs'],
  },
  {
    icon: '🐧',
    title: 'Linux Internals',
    desc: 'Going deeper into how Linux actually works — the kernel, system calls, processes, file descriptors, and building reproducible environments with dotfiles.',
    progress: 'Active',
    color: 'from-emerald-500 to-green-500',
    tags: ['Arch Linux', 'Kernel', 'Shell scripting', 'dotfiles'],
  },
  {
    icon: '🌐',
    title: 'Web Development',
    desc: 'Building more complex UIs, learning how JavaScript frameworks work under the hood, and exploring how front-end connects to real backend infrastructure.',
    progress: 'Active',
    color: 'from-gold-400 to-gold-600',
    tags: ['JavaScript', 'React', 'CSS', 'Responsive design'],
  },
  {
    icon: '🤖',
    title: 'Robotics & Hardware',
    desc: 'Interested in how software meets hardware. Exploring robotics as a long-term learning goal — understanding microcontrollers, sensors, and physical computing.',
    progress: 'Curious',
    color: 'from-amber-500 to-gold-400',
    tags: ['Robotics', 'Hardware', 'Microcontrollers'],
  },
  {
    icon: '📡',
    title: 'Server Infrastructure',
    desc: 'Expanding server knowledge beyond basic hosting. Learning about reverse proxies, containerization concepts, and how self-hosted infrastructure is managed reliably.',
    progress: 'Exploring',
    color: 'from-cyan-500 to-teal-500',
    tags: ['Coolify', 'Servers', 'Docker basics', 'DNS'],
  },
]

const progressConfig = {
  Active:    { color: 'text-green-400 bg-green-500/10 border-green-500/30' },
  Exploring: { color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  Curious:   { color: 'text-violet-400 bg-violet-500/10 border-violet-500/30' },
}

export default function Exploring() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="exploring" className="section-padding" aria-labelledby="exploring-heading">
      <div className="container-width">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <SectionHeader
            label="Currently"
            title={<>What I'm <span className="gradient-text">Exploring</span></>}
            subtitle="Things I'm actively digging into right now. This section changes as I learn."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {explorations.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, scale: 1.01 }}
                className="glass-card p-6 shimmer-overlay group"
              >
                {/* Icon + status */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-10 flex items-center justify-center text-2xl`} aria-hidden="true">
                    {item.icon}
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${progressConfig[item.progress]?.color || progressConfig.Exploring.color}`}>
                    {item.progress}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors duration-200">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag-pill text-[11px]">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.div
            variants={fadeUp}
            className="mt-12 glass-card p-6 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-accent-glow flex items-center justify-center text-xl flex-shrink-0" aria-hidden="true">
              💡
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-1">Always Learning</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Technology moves fast and there's always something new worth understanding. I'd rather be genuinely curious about a lot of things than claim expertise in areas I'm still exploring.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
