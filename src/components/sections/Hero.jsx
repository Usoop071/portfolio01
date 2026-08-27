import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import profilePic from '../../assets/utsab1.png'

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 6,
  duration: Math.random() * 8 + 6,
}))

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent-primary"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.12 + Math.random() * 0.15,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.08, 0.25, 0.08],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function CodeFloater({ text, style }) {
  return (
    <motion.div
      className="absolute hidden lg:block font-mono text-xs text-accent-primary/20 select-none pointer-events-none"
      style={style}
      animate={{ y: [0, -12, 0], opacity: [0.15, 0.35, 0.15] }}
      transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 3 }}
      aria-hidden="true"
    >
      {text}
    </motion.div>
  )
}

const floaters = [
  { text: 'int main() {', style: { top: '18%', left: '5%' } },
  { text: 'git commit -m "..."', style: { top: '30%', right: '4%' } },
  { text: 'sudo pacman -Syu', style: { bottom: '28%', left: '3%' } },
  { text: '<html lang="en">', style: { top: '55%', right: '6%' } },
  { text: 'ssh user@server', style: { bottom: '18%', right: '8%' } },
  { text: '$ ls -la /etc', style: { top: '70%', left: '6%' } },
]

// Animated single digit with flip animation
function Digit({ value, color }) {
  const [cur, setCur]       = useState(value)
  const [prev, setPrev]     = useState(value)
  const [animating, setAnim] = useState(false)

  useEffect(() => {
    if (value !== cur) {
      setPrev(cur)
      setAnim(true)
      const t = setTimeout(() => { setCur(value); setAnim(false) }, 280)
      return () => clearTimeout(t)
    }
  }, [value, cur])

  return (
    <span className="relative inline-block overflow-hidden" style={{ width: '0.62em', height: '1em' }}>
      {/* exiting */}
      {animating && (
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            animation: 'digitOut 0.28s cubic-bezier(0.4,0,1,1) forwards',
            color: color || 'rgba(245,240,232,0.95)',
          }}
        >{prev}</span>
      )}
      {/* entering */}
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{
          animation: animating ? 'digitIn 0.28s cubic-bezier(0,0,0.2,1) forwards' : 'none',
          color: color || 'rgba(245,240,232,0.95)',
        }}
      >{cur}</span>
    </span>
  )
}

// Circular arc progress ring
function ArcRing({ value, max, radius, stroke, color, glow }) {
  const circ = 2 * Math.PI * radius
  const pct  = value / max
  const dash  = circ * pct
  const gap   = circ - dash
  return (
    <circle
      cx="60" cy="60" r={radius}
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeDasharray={`${dash} ${gap}`}
      strokeDashoffset={circ * 0.25}
      style={{ filter: glow ? `drop-shadow(0 0 4px ${color})` : 'none', transition: 'stroke-dasharray 0.6s cubic-bezier(0.4,0,0.2,1)' }}
    />
  )
}

// Nepal Time Clock Card (UTC+5:45)
function NepalClock() {
  const getNPT = () => {
    const now = new Date()
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 5 * 3600000 + 45 * 60000)
  }
  const [time, setTime] = useState(getNPT)
  useEffect(() => { const id = setInterval(() => setTime(getNPT()), 1000); return () => clearInterval(id) }, [])

  const pad   = (n) => String(n).padStart(2, '0')
  const h24   = time.getHours()
  const m     = time.getMinutes()
  const s     = time.getSeconds()
  const period = h24 >= 12 ? 'PM' : 'AM'
  const hStr  = pad(h24)
  const mStr  = pad(m)
  const sStr  = pad(s)

  const greeting   = h24 < 5 ? 'Good night' : h24 < 12 ? 'Good morning' : h24 < 17 ? 'Good afternoon' : 'Good evening'
  const greetIcon  = h24 < 5 ? '🌙' : h24 < 12 ? '🌅' : h24 < 17 ? '☀️' : '🌆'
  const days       = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const months     = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const dateStr    = `${days[time.getDay()]}, ${months[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}`

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative select-none"
      style={{ minWidth: 300 }}
      aria-label={`Nepal time: ${hStr}:${mStr}:${sStr} ${period}`}
    >
      {/* Ambient glow blobs */}
      <div className="absolute -inset-8 -z-10 pointer-events-none" aria-hidden="true">
        <div style={{ position:'absolute', top:'10%', left:'5%', width:'60%', height:'60%',
          background:'radial-gradient(circle, rgba(201,168,76,0.14) 0%, transparent 70%)', filter:'blur(24px)' }} />
        <div style={{ position:'absolute', bottom:'10%', right:'5%', width:'50%', height:'50%',
          background:'radial-gradient(circle, rgba(232,201,122,0.10) 0%, transparent 70%)', filter:'blur(20px)' }} />
      </div>

      {/* Main glass card */}
      <div
        className="relative flex flex-col items-center rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(201,168,76,0.03) 50%, rgba(232,201,122,0.04) 100%)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(201,168,76,0.18)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,168,76,0.1)',
        }}
      >
        {/* Top shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), rgba(232,201,122,0.5), transparent)' }}
          aria-hidden="true" />

        {/* Header */}
        <div className="w-full px-8 pt-6 pb-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
          <div className="flex items-center gap-2">
            <span className="text-xl">{greetIcon}</span>
            <div>
              <div className="text-text-primary text-sm font-semibold">{greeting}</div>
              <div className="text-text-muted text-[11px] font-mono tracking-wider">NPT · UTC+5:45</div>
            </div>
          </div>
          {/* Live indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-[10px] font-mono font-bold tracking-wider">LIVE</span>
          </div>
        </div>

        {/* Clock body */}
        <div className="px-8 py-5 flex flex-col items-center gap-4 w-full">

          {/* Arc rings + big time */}
          <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
            {/* SVG rings */}
            <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full" aria-hidden="true">
              {/* Track rings */}
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(201,168,76,0.07)" strokeWidth="3" />
              <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(232,201,122,0.07)" strokeWidth="3" />
              <circle cx="60" cy="60" r="38" fill="none" stroke="rgba(245,230,196,0.07)" strokeWidth="3" />
              {/* Live progress rings */}
              <ArcRing value={h24 % 12 + m / 60} max={12} radius={52} stroke={3} color="rgba(201,168,76,0.9)" glow />
              <ArcRing value={m + s / 60} max={60} radius={45} stroke={3} color="rgba(232,201,122,0.85)" glow />
              <ArcRing value={s} max={60} radius={38} stroke={3} color="rgba(245,230,196,0.8)" glow />
            </svg>

            {/* Center time */}
            <div className="relative z-10 flex flex-col items-center">
              {/* HH:MM */}
              <div className="flex items-center" style={{ fontFamily:'monospace', fontWeight:900, fontSize:'3.2rem', lineHeight:1, letterSpacing:'-0.04em' }}>
                <Digit value={hStr[0]} />
                <Digit value={hStr[1]} />
                <motion.span
                  animate={{ opacity:[1,0.15,1] }}
                  transition={{ duration:1, repeat:Infinity, ease:'easeInOut' }}
                  style={{ color:'rgba(201,168,76,0.8)', margin:'0 2px', fontSize:'2.8rem' }}
                >:</motion.span>
                <Digit value={mStr[0]} />
                <Digit value={mStr[1]} />
              </div>
              {/* SS */}
              <div className="flex items-center gap-1 mt-0.5">
                <span style={{ fontFamily:'monospace', fontSize:'1.1rem', fontWeight:700, color:'rgba(232,201,122,0.9)', letterSpacing:'0.05em' }}>
                  <Digit value={sStr[0]} color="rgba(232,201,122,0.9)" />
                  <Digit value={sStr[1]} color="rgba(232,201,122,0.9)" />
                </span>
                <span style={{ fontSize:'0.75rem', fontWeight:700, color:'rgba(201,168,76,0.7)', letterSpacing:'0.1em' }}>{period}</span>
              </div>
            </div>
          </div>

          {/* Ring legend */}
          <div className="flex items-center gap-4">
            {[
              { color:'rgba(201,168,76,0.9)', label:'HRS' },
              { color:'rgba(232,201,122,0.85)', label:'MIN' },
              { color:'rgba(245,230,196,0.8)',  label:'SEC' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ background: color, boxShadow:`0 0 4px ${color}` }} />
                <span className="text-text-muted text-[10px] font-mono tracking-widest">{label}</span>
              </div>
            ))}
          </div>

          {/* Seconds bar */}
          <div className="w-full">
            <div className="flex justify-between text-[10px] font-mono text-text-muted mb-1">
              <span>0s</span>
              <span className="text-accent-primary">{s}s</span>
              <span>60s</span>
            </div>
            <div className="w-full rounded-full overflow-hidden" style={{ height:3, background:'rgba(201,168,76,0.08)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background:'linear-gradient(90deg, #C9A84C, #E8C97A, #F5E6C4)' }}
                animate={{ width:`${(s / 59) * 100}%` }}
                transition={{ duration:0.5, ease:'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full px-8 py-4 flex flex-col items-center gap-1"
          style={{ borderTop:'1px solid rgba(201,168,76,0.08)', background:'rgba(0,0,0,0.15)' }}>
          <span className="text-text-secondary text-xs font-medium">{dateStr}</span>
          <span className="flex items-center gap-1 text-text-muted text-[11px]">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            Kathmandu, Nepal
          </span>
        </div>
      </div>

      {/* CSS keyframes */}
      <style>{`
        @keyframes digitOut {
          from { transform: translateY(0) rotateX(0deg);   opacity: 1; }
          to   { transform: translateY(-100%) rotateX(90deg); opacity: 0; }
        }
        @keyframes digitIn {
          from { transform: translateY(100%) rotateX(-90deg); opacity: 0; }
          to   { transform: translateY(0)    rotateX(0deg);   opacity: 1; }
        }
      `}</style>
    </motion.div>
  )
}

function ScrollHint() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, delay: visible ? 1.5 : 0 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
      aria-hidden="true"
    >
      <span className="text-text-muted text-xs font-mono tracking-widest uppercase">Scroll</span>
      <div className="w-px h-12 relative overflow-hidden" style={{ background: 'rgba(201,168,76,0.15)' }}>
        <motion.div
          className="absolute top-0 w-full rounded-full"
          style={{ height: '40%', background: 'linear-gradient(to bottom, #C9A84C, transparent)' }}
          animate={{ y: ['-100%', '300%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      aria-label="Hero section"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(232,201,122,0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Particle field */}
      <ParticleField />

      {/* Floating code snippets */}
      {floaters.map((f, i) => (
        <CodeFloater key={i} text={f.text} style={f.style} />
      ))}

      {/* Main content */}
      <div className="container-width relative z-10 text-center px-4">

        {/* Profile picture + Nepal clock side by side */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-10"
        >
          {/* Professional photo card */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-shrink-0 group"
          >
            {/* Ambient glow */}
            <div className="absolute -inset-4 -z-10 rounded-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.3) 0%, rgba(232,201,122,0.15) 40%, transparent 70%)',
                filter: 'blur(20px)',
              }} aria-hidden="true" />

            {/* Card */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 0 0 1px rgba(201,168,76,0.2), 0 4px 6px rgba(0,0,0,0.3), 0 20px 50px rgba(0,0,0,0.5)',
                background: 'rgba(10,10,10,0.7)',
              }}
            >
              {/* Photo */}
              <img
                src={profilePic}
                alt="Utsab Shah"
                style={{
                  width: 220,
                  height: 300,
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  filter: 'brightness(1.05) saturate(1.05) contrast(1.02)',
                }}
              />

              {/* Bottom overlay with name */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3"
                style={{
                  background: 'linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.6) 60%, transparent 100%)',
                }}
              >
                <div className="text-text-primary font-bold text-base leading-tight">Utsab Shah</div>
                <div className="text-text-muted text-[11px] font-mono mt-0.5 tracking-wide">Developer · Kathmandu</div>
              </div>

              {/* Top-right accent corner */}
              <div className="absolute top-0 right-0 w-12 h-12 opacity-60" aria-hidden="true"
                style={{
                  background: 'linear-gradient(225deg, rgba(201,168,76,0.45) 0%, transparent 60%)',
                }} />

              {/* Online badge */}
              <div
                className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(34,197,94,0.3)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-[10px] font-mono font-semibold tracking-wider">online</span>
              </div>
            </div>

            {/* Subtle side accent line */}
            <div
              className="absolute -left-px top-8 bottom-8 w-px rounded-full opacity-50"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.6), transparent)' }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Nepal Clock Card */}
          <NepalClock />
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium border border-border-subtle bg-bg-glass backdrop-blur-sm text-text-secondary mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          <span>Class 11 · NIST College, Kathmandu · Nepal</span>
          <span className="opacity-40 mx-1" aria-hidden="true">|</span>
          <span>Currently learning & building</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-text-primary leading-none mb-4"
        >
          Hi, I'm{' '}
          <span className="gradient-text">Utsab Shah</span>
          <span style={{ color: '#C9A84C' }}>.</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex items-center justify-center gap-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-text-secondary mb-8"
          aria-label="Role description"
        >
          <span>I'm a</span>
          <span className="text-accent-primary min-w-[280px] sm:min-w-[320px] text-left">
            <TypeAnimation
              sequence={[
                'Developer', 2000,
                'Tech Enthusiast', 2000,
                'Linux Explorer', 2000,
                'Problem Solver', 2000,
                'Cybersecurity Learner', 2200,
                'Future Engineer', 2000,
              ]}
              wrapper="span"
              speed={50}
              deletionSpeed={65}
              repeat={Infinity}
              aria-hidden="false"
            />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          I build, break, experiment, and learn — from C programs and Linux systems
          to websites, servers, and networking.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-primary text-base px-8 py-3.5"
          >
            Explore My Work
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-ghost text-base px-8 py-3.5"
          >
            About Me
          </a>
          <a
            href="https://github.com/usoop071"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-base px-8 py-3.5"
            aria-label="GitHub profile (opens in new tab)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </motion.div>

        {/* Tech stack preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
          aria-label="Technologies"
        >
          {['C', 'HTML', 'CSS', 'JavaScript', 'Linux', 'Git', 'Flutter', 'Kali Linux'].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.06 }}
              className="tag-pill"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator - fixed at viewport bottom, disappears after scrolling */}
      <ScrollHint />
    </section>
  )
}
