import { useEffect, useState } from 'react'

export function Preloader3D({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('INITIALIZING 3D GRAPHICS ENGINE...')
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    const statuses = [
      'INITIALIZING 3D GRAPHICS ENGINE...',
      'BUILDING FIBONACCI SKILL MATRIX...',
      'COMPILING SHADERS & LIGHTING...',
      'SYSTEM READY.',
    ]

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setFadingOut(true)
          setTimeout(() => {
            onComplete?.()
          }, 600)
          return 100
        }
        const next = prev + Math.floor(Math.random() * 14) + 8
        const statusIdx = Math.min(Math.floor((next / 100) * statuses.length), statuses.length - 1)
        setStatus(statuses[statusIdx])
        return Math.min(next, 100)
      })
    }, 90)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`preloader-3d ${fadingOut ? 'is-fading' : ''}`} aria-hidden="true">
      <div className="preloader-3d__content">
        <div className="preloader-3d__spinner">
          <div className="preloader-3d__ring preloader-3d__ring--outer" />
          <div className="preloader-3d__ring preloader-3d__ring--inner" />
          <span className="preloader-3d__core">&gt;_</span>
        </div>

        <div className="preloader-3d__counter">
          <strong>{progress}<i>%</i></strong>
        </div>

        <div className="preloader-3d__bar-track">
          <div className="preloader-3d__bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <p className="preloader-3d__status">{status}</p>
      </div>

      <div className="preloader-3d__bg-grid" />
    </div>
  )
}
