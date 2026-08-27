import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { staggerContainer, fadeUp } from '../../hooks/useScrollReveal'

const skillCategories = [
  {
    id: 'programming',
    title: 'Programming',
    icon: '💻',
    color: 'from-gold-400 to-gold-600',
    borderColor: 'border-gold-500/20',
    skills: [
      { name: 'C', level: 'Learning', desc: 'Variables, loops, pointers, recursion, arrays' },
      { name: 'HTML', level: 'Building With', desc: 'Semantic markup, structure, accessibility' },
      { name: 'CSS', level: 'Building With', desc: 'Layouts, animations, responsive design' },
      { name: 'JavaScript', level: 'Exploring', desc: 'DOM, events, interactive interfaces' },
    ],
  },
  {
    id: 'development',
    title: 'Development',
    icon: '🛠️',
    color: 'from-gold-500 to-gold-300',
    borderColor: 'border-gold-400/20',
    skills: [
      { name: 'Web Development', level: 'Building With', desc: 'HTML, CSS, JS, animations, layouts' },
      { name: 'Flutter', level: 'Exploring', desc: 'Mobile app development with Dart' },
      { name: 'Git / GitHub', level: 'Familiar', desc: 'Version control, repos, GitHub Pages' },
      { name: 'VS Code', level: 'Building With', desc: 'Primary development environment' },
    ],
  },
  {
    id: 'systems',
    title: 'Systems & OS',
    icon: '🐧',
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/20',
    skills: [
      { name: 'Linux', level: 'Familiar', desc: 'CLI, file system, permissions, services' },
      { name: 'Arch Linux', level: 'Exploring', desc: 'Manual installation, package management' },
      { name: 'Kali Linux', level: 'Exploring', desc: 'Security tools, Wireshark, reconnaissance' },
      { name: 'Omarchy / Hyprland', level: 'Exploring', desc: 'Tiling WM, dotfiles, custom configs' },
      { name: 'Virtual Machines', level: 'Familiar', desc: 'VirtualBox, VM setup and networking' },
      { name: 'Coolify / Servers', level: 'Exploring', desc: 'Self-hosted deployment, server management' },
    ],
  },
  {
    id: 'networking',
    title: 'Networking & Infra',
    icon: '🌐',
    color: 'from-orange-500 to-amber-400',
    borderColor: 'border-orange-500/20',
    skills: [
      { name: 'DNS / Cloudflare', level: 'Familiar', desc: 'CNAME, A records, DNS configuration' },
      { name: 'Networking Fundamentals', level: 'Learning', desc: 'Protocols, IPs, ports, packets' },
      { name: 'Wireshark', level: 'Exploring', desc: 'Packet capture and analysis' },
      { name: 'SSH', level: 'Familiar', desc: 'Remote access, key-based auth' },
      { name: 'Web Hosting', level: 'Familiar', desc: 'GitHub Pages, Cloudflare Pages, .np domains' },
    ],
  },
]

const levelConfig = {
  'Learning':     { color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30', dot: 'bg-yellow-400' },
  'Exploring':    { color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/30',   dot: 'bg-blue-400' },
  'Familiar':     { color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/30', dot: 'bg-green-400' },
  'Building With': { color: 'text-accent-primary', bg: 'bg-accent-primary/10 border-accent-primary/30', dot: 'bg-accent-primary' },
}

function SkillBadge({ skill }) {
  const cfg = levelConfig[skill.level] || levelConfig['Exploring']

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      className="skill-badge glass-card p-4 flex items-start justify-between gap-3 shimmer-overlay"
    >
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-text-primary text-sm mb-0.5 truncate">{skill.name}</div>
        <div className="text-text-muted text-xs leading-relaxed line-clamp-2">{skill.desc}</div>
      </div>
      <span className={`flex-shrink-0 inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.color}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} aria-hidden="true" />
        {skill.level}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills" className="section-padding" aria-labelledby="skills-heading">
      <div className="container-width">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <SectionHeader
            label="Tech Stack"
            title={<>Skills & <span className="gradient-text">Technologies</span></>}
            subtitle="An honest map of what I've worked with, organized by how well I know it."
          />

          {/* Legend */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
            aria-label="Skill level legend"
          >
            {Object.entries(levelConfig).map(([level, cfg]) => (
              <span key={level} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} aria-hidden="true" />
                {level}
              </span>
            ))}
          </motion.div>

          {/* Category grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                variants={fadeUp}
                custom={i}
                className={`glass-card p-6 border ${cat.borderColor}`}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} bg-opacity-20 flex items-center justify-center text-xl`} aria-hidden="true">
                    {cat.icon}
                  </div>
                  <h3
                    id={`skills-${cat.id}`}
                    className="font-bold text-text-primary"
                  >
                    {cat.title}
                  </h3>
                  <span className="ml-auto text-xs font-mono text-text-muted">
                    {cat.skills.length} items
                  </span>
                </div>

                {/* Skills list */}
                <div className="space-y-2.5" aria-labelledby={`skills-${cat.id}`}>
                  {cat.skills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tools callout */}
          <motion.div variants={fadeUp} className="mt-10 glass-card p-6">
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4 font-mono">
              Tools & Utilities I Use
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'VS Code', 'Git', 'GitHub', 'VirtualBox', 'Android Studio',
                'ADB', 'scrcpy', 'Wireshark', 'smartctl', 'Cloudflare',
                'GitHub Pages', 'Coolify', 'SSH', 'Hyprland',
              ].map((tool) => (
                <motion.span
                  key={tool}
                  whileHover={{ y: -2 }}
                  className="tag-pill cursor-default"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
