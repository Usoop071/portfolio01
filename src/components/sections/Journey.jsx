import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import { staggerContainer, fadeUp } from '../../hooks/useScrollReveal'

const milestones = [
  {
    phase: '01',
    title: 'First Lines of Code',
    area: 'Programming Foundations',
    desc: 'Started with the fundamentals — understanding how programs are structured. Picked up C and began working through variables, I/O, conditionals, and loops.',
    tags: ['C', 'Variables', 'I/O', 'Loops'],
    color: 'from-gold-400 to-gold-600',
    dotColor: 'bg-gold-500',
    status: 'ongoing',
  },
  {
    phase: '02',
    title: 'Building for the Web',
    area: 'Web Development',
    desc: 'Moved into HTML, CSS, and JavaScript. Started building pages, experimenting with layouts, animations, and navigation. Discovered how much is possible with just a browser.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Animations'],
    color: 'from-amber-400 to-gold-400',
    dotColor: 'bg-amber-500',
    status: 'ongoing',
  },
  {
    phase: '03',
    title: 'Going Deep on Linux',
    area: 'Systems & OS',
    desc: 'Installed and explored multiple Linux distributions. Set up Arch Linux from scratch, experimented with Omarchy and Hyprland, and got comfortable with the terminal and system administration.',
    tags: ['Arch Linux', 'Kali Linux', 'Omarchy', 'Hyprland', 'CLI'],
    color: 'from-emerald-500 to-teal-500',
    dotColor: 'bg-emerald-500',
    status: 'ongoing',
  },
  {
    phase: '04',
    title: 'Networks & Infrastructure',
    area: 'Networking & Hosting',
    desc: 'Learned how DNS works end-to-end. Configured Cloudflare, set up CNAME and A records, registered a .np domain, and deployed sites on GitHub Pages and Cloudflare Pages.',
    tags: ['DNS', 'Cloudflare', '.np domain', 'GitHub Pages', 'SSH'],
    color: 'from-orange-500 to-amber-400',
    dotColor: 'bg-orange-500',
    status: 'ongoing',
  },
  {
    phase: '05',
    title: 'Servers & Self-Hosting',
    area: 'DevOps & Deployment',
    desc: 'Explored server deployment using Coolify. Used virtual machines to simulate server environments. Started understanding how real deployments work behind the scenes.',
    tags: ['Coolify', 'VirtualBox', 'VMs', 'Servers'],
    color: 'from-teal-500 to-emerald-400',
    dotColor: 'bg-teal-500',
    status: 'ongoing',
  },
  {
    phase: '06',
    title: 'Security & Reconnaissance',
    area: 'Cybersecurity',
    desc: 'Began exploring cybersecurity concepts — network analysis with Wireshark, Kali Linux tooling, and understanding how systems can be tested and hardened. Still early in this journey.',
    tags: ['Kali Linux', 'Wireshark', 'Networking', 'Security concepts'],
    color: 'from-red-500 to-rose-500',
    dotColor: 'bg-red-500',
    status: 'exploring',
  },
  {
    phase: '07',
    title: 'What Comes Next',
    area: 'Advanced Development',
    desc: 'The path ahead: deeper into C and systems programming, backend development, more structured security learning, robotics, and eventually contributing to real open-source projects.',
    tags: ['Open Source', 'Backend', 'Robotics', 'Security', 'Systems'],
    color: 'from-accent-primary to-accent-secondary',
    dotColor: 'bg-accent-primary',
    status: 'future',
  },
]

const statusConfig = {
  ongoing:   { label: 'Ongoing',   color: 'text-green-400 bg-green-500/10 border-green-500/30' },
  exploring: { label: 'Exploring', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  future:    { label: 'Planned',   color: 'text-accent-primary bg-accent-glow border-border-subtle' },
}

export default function Journey() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="journey" className="section-padding" aria-labelledby="journey-heading">
      <div className="container-width">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <SectionHeader
            label="Learning Journey"
            title={<>My <span className="gradient-text">Learning Path</span></>}
            subtitle="Not a resume. A real timeline of how I've been exploring technology, one topic at a time."
          />

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.5), rgba(232,201,122,0.25), transparent)' }}
              aria-hidden="true"
            />

            <div className="space-y-8">
              {milestones.map((m, i) => {
                const isRight = i % 2 === 1
                return (
                  <motion.div
                    key={m.phase}
                    variants={fadeUp}
                    custom={i}
                    className={`relative flex flex-col md:flex-row md:items-start gap-6 ${isRight ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Phase dot */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 z-10" aria-hidden="true">
                      <div className={`w-5 h-5 rounded-full ${m.dotColor} ring-4 ring-bg-primary shadow-glow-sm`} />
                    </div>

                    {/* Spacer for desktop alignment */}
                    <div className="hidden md:block md:w-[calc(50%-24px)] flex-shrink-0" />

                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      className={`ml-12 md:ml-0 md:w-[calc(50%-24px)] glass-card p-6 shimmer-overlay ${isRight ? 'md:mr-6' : 'md:ml-6'}`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <span className="font-mono text-xs text-text-muted mb-1 block">Phase {m.phase}</span>
                          <h3 className="font-bold text-text-primary text-lg leading-tight">{m.title}</h3>
                          <span className={`mt-1 inline-block text-xs font-medium bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}>
                            {m.area}
                          </span>
                        </div>
                        <span className={`flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border ${statusConfig[m.status].color}`}>
                          {statusConfig[m.status].label}
                        </span>
                      </div>

                      <p className="text-text-secondary text-sm leading-relaxed mb-4">{m.desc}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {m.tags.map((tag) => (
                          <span key={tag} className="tag-pill text-[11px]">{tag}</span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
