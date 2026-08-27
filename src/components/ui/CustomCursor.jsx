import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth < 1024 || prefersReduced) return

    let trailX = -100, trailY = -100
    let rafId

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
      const target = e.target
      const pointer = window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' || target.tagName === 'BUTTON' ||
        target.closest('a') || target.closest('button')
      setIsPointer(!!pointer)
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    const animate = () => {
      trailX += (pos.x - trailX) * 0.12
      trailY += (pos.y - trailY) * 0.12
      setTrail({ x: trailX, y: trailY })
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(rafId)
    }
  }, [pos.x, pos.y, prefersReduced])

  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null
  if (prefersReduced) return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          width: isPointer ? '8px' : '6px',
          height: isPointer ? '8px' : '6px',
          borderRadius: '50%',
          background: '#fff',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s, width 0.2s, height 0.2s',
        }}
        aria-hidden="true"
      />
      {/* Trailing ring */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: trail.x,
          top: trail.y,
          transform: 'translate(-50%, -50%)',
          width: isPointer ? '44px' : '32px',
          height: isPointer ? '44px' : '32px',
          borderRadius: '50%',
          border: `1.5px solid rgba(201,168,76,${isPointer ? 0.8 : 0.45})`,
          background: isPointer ? 'rgba(201,168,76,0.06)' : 'transparent',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s, width 0.3s, height 0.3s, border-color 0.2s',
        }}
        aria-hidden="true"
      />
    </>
  )
}
