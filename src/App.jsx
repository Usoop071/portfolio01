import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/ui/CustomCursor'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Journey from './components/sections/Journey'
import Projects from './components/sections/Projects'
import Exploring from './components/sections/Exploring'
import Education from './components/sections/Education'
import GitHub from './components/sections/GitHub'
import Contact from './components/sections/Contact'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function App() {
  useSmoothScroll()

  return (
    <div className="relative min-h-screen bg-bg-primary overflow-x-hidden">
      {/* Custom cursor - desktop only */}
      <CustomCursor />

      {/* Global background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="orb w-96 h-96 bg-accent-primary top-20 -left-48" />
        <div className="orb w-80 h-80 bg-accent-secondary top-1/3 right-0" style={{ animationDelay: '4s' }} />
        <div className="orb w-64 h-64 bg-accent-warm bottom-1/4 left-1/3" style={{ animationDelay: '8s', opacity: 0.04 }} />
      </div>

      {/* Grid background */}
      <div
        className="fixed inset-0 bg-grid-pattern pointer-events-none z-0"
        aria-hidden="true"
        style={{ backgroundSize: '60px 60px' }}
      />

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Journey />
        <Projects />
        <Exploring />
        <Education />
        <GitHub />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
