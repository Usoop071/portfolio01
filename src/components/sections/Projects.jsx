import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { staggerContainer, fadeUp } from '../../hooks/useScrollReveal'

const projects = [
  {
    id: 'portfolio',
    title: 'Personal Portfolio Website',
    desc: 'This website. Built from scratch using React, Vite, Tailwind CSS, and Framer Motion. Designed to look professional while honestly reflecting my current learning stage.',
    longDesc: 'Includes smooth scroll, custom cursor, animated sections, responsive design, and deployment via GitHub Pages / Cloudflare Pages.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    status: 'In Progress',
    statusColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    github: 'https://github.com/usoop071/portfolio',
    demo: '#',
    demoLabel: 'You\'re here',
    icon: '🌐',
    gradient: 'from-gold-500/20 to-gold-300/20',
  },
  {
    id: 'website-hosting',
    title: 'Website Hosting Experiments',
    desc: 'Explored full deployment pipelines: custom .np domains, Cloudflare DNS, CNAME/A records, GitHub Pages, and Cloudflare Pages. Hands-on with how websites actually reach the internet.',
    longDesc: 'Includes DNS propagation, SSL certificates via Cloudflare, and understanding of how nameservers and registrars work.',
    tech: ['Cloudflare', 'GitHub Pages', 'DNS', '.np Domain'],
    status: 'Ongoing',
    statusColor: 'text-green-400 bg-green-500/10 border-green-500/30',
    github: 'https://github.com/usoop071',
    demo: null,
    icon: '🔗',
    gradient: 'from-emerald-600/20 to-cyan-500/20',
  },
  {
    id: 'linux-setup',
    title: 'Linux Environment Setup',
    desc: 'Installed and configured multiple Linux distributions including Arch Linux, Kali Linux, and Omarchy. Built custom environments using Hyprland as a tiling window manager.',
    longDesc: 'Experimented with dotfiles, package management, system services, and creating reproducible development environments inside VirtualBox.',
    tech: ['Arch Linux', 'Kali Linux', 'Hyprland', 'Omarchy', 'VirtualBox'],
    status: 'Ongoing',
    statusColor: 'text-green-400 bg-green-500/10 border-green-500/30',
    github: 'https://github.com/usoop071',
    demo: null,
    icon: '🐧',
    gradient: 'from-orange-600/20 to-amber-500/20',
  },
  {
    id: 'c-learning',
    title: 'C Programming Journey',
    desc: 'Actively working through C fundamentals: variables, I/O with getchar()/putchar(), loops, arrays, functions, pointers, recursion, and basic algorithmic problem solving.',
    longDesc: 'Focus is on understanding how low-level programming works — memory management, pointer arithmetic, and writing clean, correct C code.',
    tech: ['C', 'GCC', 'CLI', 'Algorithms'],
    status: 'Learning',
    statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    github: 'https://github.com/usoop071',
    demo: null,
    icon: '⚙️',
    gradient: 'from-violet-600/20 to-gold-400/20',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Exploration',
    desc: 'Exploring cybersecurity tools and concepts using Kali Linux. Experimented with Wireshark for packet analysis and studied basic networking security concepts.',
    longDesc: 'This is a learning and exploration area — not professional penetration testing. Focus is on understanding how systems and networks can be analysed and secured.',
    tech: ['Kali Linux', 'Wireshark', 'Networking', 'Security'],
    status: 'Exploring',
    statusColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    github: 'https://github.com/usoop071',
    demo: null,
    icon: '🔐',
    gradient: 'from-red-600/20 to-rose-500/20',
  },
  {
    id: 'web-dev',
    title: 'Web Development Experiments',
    desc: 'Built multiple HTML/CSS/JS projects while learning web fundamentals. Experimented with CSS animations, JavaScript interactions, and responsive layouts.',
    longDesc: 'Includes navigation bars, animated elements, interactive cards, and learning how browsers render and animate content.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Animations'],
    status: 'Building',
    statusColor: 'text-accent-primary bg-accent-glow border-border-subtle',
    github: 'https://github.com/usoop071',
    demo: null,
    icon: '🎨',
    gradient: 'from-pink-600/20 to-accent-primary/20',
  },
]

function TiltCard({ project, index }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="tilt-card glass-card overflow-hidden group cursor-default"
    >
      {/* Gradient top bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.gradient.replace('/20', '')}`} aria-hidden="true" />

      {/* Card content */}
      <div className="p-6 flex flex-col h-full" style={{ transform: 'translateZ(20px)' }}>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-2xl border border-border-subtle`} aria-hidden="true">
              {project.icon}
            </div>
            <div>
              <h3 className="font-bold text-text-primary leading-tight text-sm md:text-base">
                {project.title}
              </h3>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${project.statusColor} mt-1 inline-block`}>
                {project.status}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
          {project.desc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="tag-pill text-[11px]">{t}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-text-secondary border border-border-subtle hover:text-text-primary hover:border-accent-primary hover:bg-accent-glow transition-all duration-200"
            aria-label={`${project.title} GitHub repository`}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target={project.demo === '#' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-accent-glow text-accent-primary border border-border-glow hover:bg-accent-primary hover:text-white transition-all duration-200"
              aria-label={`${project.title} live demo`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {project.demoLabel || 'Live Demo'}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="projects" className="section-padding" aria-labelledby="projects-heading">
      <div className="container-width">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <SectionHeader
            label="Projects"
            title={<>Things I've <span className="gradient-text">Built & Explored</span></>}
            subtitle="Real projects, honest descriptions. No inflated claims — just what I've actually worked on."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <TiltCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* Note */}
          <motion.p
            variants={fadeUp}
            className="mt-10 text-center text-text-muted text-sm"
          >
            More projects on{' '}
            <a
              href="https://github.com/usoop071"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-primary hover:underline"
            >
              GitHub
            </a>
            {' '}— replace{' '}
            <code className="text-accent-secondary text-xs bg-bg-card px-1.5 py-0.5 rounded">usoop071</code>
            {' '}with your actual username.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
