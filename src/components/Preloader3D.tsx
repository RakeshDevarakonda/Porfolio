import { useEffect, useState } from 'react'

export function Preloader3D({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('> INITIALIZING COMMAND CORE...')
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    const statuses = [
      '> INITIALIZING COMMAND CORE...',
      '> LOADING BACKEND INFRASTRUCTURE & 3D MATRIX...',
      '> CONNECTING MULTI-TENANT SERVICES & CLOUD PIPELINES...',
      '> SYSTEM STATUS: 100% OPERATIONAL',
    ]

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setFadingOut(true)
          setTimeout(() => {
            onComplete?.()
          }, 500)
          return 100
        }
        const next = prev + Math.floor(Math.random() * 15) + 10
        const statusIdx = Math.min(Math.floor((next / 100) * statuses.length), statuses.length - 1)
        setStatus(statuses[statusIdx])
        return Math.min(next, 100)
      })
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`preloader-3d ${fadingOut ? 'is-fading' : ''}`} aria-hidden="true">
      <div className="preloader-3d__content">
        {/* Sleek Brand Core Emblem */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '12px',
          border: '1px solid var(--blue)',
          background: 'rgba(10, 16, 26, 0.9)',
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 0 25px color-mix(in srgb, var(--blue) 30%, transparent)',
          fontSize: '1.2rem',
          fontWeight: 800,
          color: 'var(--blue)',
          fontFamily: 'var(--mono)',
        }}>
          RD
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
