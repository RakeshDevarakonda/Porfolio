import { useEffect, useRef, useState } from 'react'

export function CursorFollower() {
  const dotRef = useRef<HTMLSpanElement>(null)
  const haloRef = useRef<HTMLSpanElement>(null)
  const ringRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [hoverText, setHoverText] = useState<string>('')

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!finePointer.matches || reducedMotion.matches) return

    const dot = dotRef.current
    const halo = haloRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !halo || !ring || !label) return

    let targetX = -100
    let targetY = -100
    let haloX = targetX
    let haloY = targetY
    let ringX = targetX
    let ringY = targetY
    let rotation = 0
    let frame = 0

    const render = () => {
      // Fluid spring lerp physics
      haloX += (targetX - haloX) * 0.18
      haloY += (targetY - haloY) * 0.18

      ringX += (targetX - ringX) * 0.09
      ringY += (targetY - ringY) * 0.09

      rotation += 0.8

      halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) rotate(${rotation}deg)`
      label.style.transform = `translate3d(${haloX}px, ${haloY + 36}px, 0)`

      frame = requestAnimationFrame(render)
    }

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
      document.documentElement.classList.add('cursor-is-visible')

      const targetEl = event.target as HTMLElement | null
      const interactive = targetEl?.closest(
        'a, button, input, textarea, .project-card, .focus-card, .skill-pill, .tilt-card-3d'
      )

      if (interactive) {
        document.documentElement.classList.add('cursor-is-interactive')
        if (targetEl?.closest('.project-card')) {
          setHoverText('VIEW BUILD')
        } else if (targetEl?.closest('a[download]')) {
          setHoverText('DOWNLOAD')
        } else if (targetEl?.closest('button') || targetEl?.closest('a')) {
          setHoverText('OPEN')
        } else {
          setHoverText('')
        }
      } else {
        document.documentElement.classList.remove('cursor-is-interactive')
        setHoverText('')
      }
    }

    const handlePointerDown = () => document.documentElement.classList.add('cursor-is-clicking')
    const handlePointerUp = () => document.documentElement.classList.remove('cursor-is-clicking')
    const handlePointerLeave = () => document.documentElement.classList.remove('cursor-is-visible')

    document.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('pointerdown', handlePointerDown, { passive: true })
    document.addEventListener('pointerup', handlePointerUp, { passive: true })
    document.addEventListener('pointerleave', handlePointerLeave, { passive: true })
    frame = requestAnimationFrame(render)
    document.documentElement.classList.add('has-cursor-follower')

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('pointerleave', handlePointerLeave)
      document.documentElement.classList.remove('has-cursor-follower', 'cursor-is-visible', 'cursor-is-interactive', 'cursor-is-clicking')
    }
  }, [])

  return (
    <div className="cursor-follower" aria-hidden="true">
      <span ref={ringRef} className="cursor-follower__ring" />
      <span ref={haloRef} className="cursor-follower__halo">
        <span className="cursor-crosshair cursor-crosshair--top" />
        <span className="cursor-crosshair cursor-crosshair--right" />
        <span className="cursor-crosshair cursor-crosshair--bottom" />
        <span className="cursor-crosshair cursor-crosshair--left" />
      </span>
      <span ref={dotRef} className="cursor-follower__dot" />
      <span ref={labelRef} className="cursor-follower__label">
        {hoverText}
      </span>
    </div>
  )
}
