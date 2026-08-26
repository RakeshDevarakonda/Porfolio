import { useEffect, useRef, useState } from 'react'

export function CursorFollower() {
  const haloRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const ringRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [actionText, setActionText] = useState('STARK HUD')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches
    if (isCoarse) return

    document.documentElement.classList.add('has-cursor-follower')

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let haloX = pointerX
    let haloY = pointerY
    let ringX = pointerX
    let ringY = pointerY
    let rotation = 0

    let animationFrame = 0

    const updatePosition = () => {
      haloX += (pointerX - haloX) * 0.22
      haloY += (pointerY - haloY) * 0.22

      ringX += (pointerX - ringX) * 0.12
      ringY += (pointerY - ringY) * 0.12

      rotation = (rotation + 1.5) % 360

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) rotate(${rotation}deg)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${pointerX + 24}px, ${pointerY - 24}px, 0)`
      }

      animationFrame = requestAnimationFrame(updatePosition)
    }

    const handlePointerMove = (e: PointerEvent) => {
      pointerX = e.clientX
      pointerY = e.clientY
      document.documentElement.classList.add('cursor-is-visible')

      const target = e.target as HTMLElement | null
      const interactiveEl = target?.closest('a, button, [role="button"], input, textarea, .tilt-card-3d')

      if (interactiveEl) {
        document.documentElement.classList.add('cursor-is-interactive')
        if (interactiveEl.tagName === 'A') {
          const href = (interactiveEl as HTMLAnchorElement).href || ''
          if (href.includes('github')) setActionText('[TARGET: GITHUB]')
          else if (href.includes('linkedin')) setActionText('[TARGET: LINKEDIN]')
          else if (href.includes('resume')) setActionText('[TARGET: RESUME]')
          else setActionText('[TARGET: OPEN LINK]')
        } else if (interactiveEl.tagName === 'BUTTON') {
          setActionText('[TARGET: EXECUTE]')
        } else {
          setActionText('[TARGET: LOCK-ON]')
        }
      } else {
        document.documentElement.classList.remove('cursor-is-interactive')
      }
    }

    const handlePointerDown = () => document.documentElement.classList.add('cursor-is-clicking')
    const handlePointerUp = () => document.documentElement.classList.remove('cursor-is-clicking')
    const handleMouseLeave = () => document.documentElement.classList.remove('cursor-is-visible')

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('mouseleave', handleMouseLeave)

    animationFrame = requestAnimationFrame(updatePosition)

    return () => {
      cancelAnimationFrame(animationFrame)
      document.documentElement.classList.remove(
        'has-cursor-follower',
        'cursor-is-visible',
        'cursor-is-interactive',
        'cursor-is-clicking'
      )
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="cursor-follower" aria-hidden="true">
      <span ref={haloRef} className="cursor-follower__halo">
        <span className="cursor-crosshair cursor-crosshair--top" />
        <span className="cursor-crosshair cursor-crosshair--bottom" />
        <span className="cursor-crosshair cursor-crosshair--left" />
        <span className="cursor-crosshair cursor-crosshair--right" />
      </span>
      <span ref={ringRef} className="cursor-follower__ring" />
      <span ref={dotRef} className="cursor-follower__dot" />
      <span ref={labelRef} className="cursor-follower__label">{actionText}</span>
    </div>
  )
}
