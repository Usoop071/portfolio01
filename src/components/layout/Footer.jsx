import { motion } from 'framer-motion'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-border-subtle bg-bg-secondary/40 backdrop-blur-sm" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', color: '#0A0A0A' }}>
                U
              </div>
              <span className="font-semibold text-text-primary text-sm">
                Utsab Shah
              </span>
            </div>
            <p className="text-text-muted text-xs max-w-xs text-center md:text-left">
              Building, breaking, and learning. From Nepal, for the world.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/usoop071"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-primary transition-colors duration-200 p-2 rounded-lg hover:bg-accent-glow"
              aria-label="GitHub (opens in new tab)"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="mailto:shahutsab071@gmail.com"
              className="text-text-muted hover:text-accent-primary transition-colors duration-200 p-2 rounded-lg hover:bg-accent-glow"
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>

          </div>

          {/* Copyright */}
          <p className="text-text-muted text-xs text-center md:text-right">
            © {year} Utsab Shah. Built with React + Vite.
            <br />
            <span className="opacity-60">Kathmandu, Nepal</span>
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border-subtle flex items-center justify-center gap-2 text-xs text-text-muted">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          <span>Available for learning, collaboration, and interesting projects</span>
        </div>
      </div>
    </footer>
  )
}
