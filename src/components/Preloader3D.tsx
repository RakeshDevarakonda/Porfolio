import { useEffect, useState } from 'react'

const bootLogs = [
  '[ OK ] Initializing ARM64 Quantum Compute Layer...',
  '[ OK ] Mounting PostgreSQL Relational RBAC Engine...',
  '[ OK ] Establishing WebSocket Sub-100ms Channels...',
  '[ OK ] Syncing AWS SQS & Lambda Async Queues...',
  '[ OK ] Loading MERN & Go Microservices...',
  '[ OK ] Verifying multi-tenant security boundaries...',
  '[ ONLINE ] System fully operational.',
]

export function Preloader3D({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [activeLogs, setActiveLogs] = useState<string[]>([bootLogs[0]])
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    // Total duration ~2000ms (2.0 seconds) across 25 ticks of 80ms
    const totalTicks = 25
    let currentTick = 0

    const interval = setInterval(() => {
      currentTick += 1
      const nextProgress = Math.min(Math.floor((currentTick / totalTicks) * 100), 100)
      setProgress(nextProgress)

      const logCount = Math.min(Math.floor((nextProgress / 100) * bootLogs.length) + 1, bootLogs.length)
      setActiveLogs(bootLogs.slice(0, logCount))

      if (currentTick >= totalTicks) {
        clearInterval(interval)
        setTimeout(() => {
          setFadingOut(true)
          setTimeout(() => {
            onComplete?.()
          }, 450)
        }, 150)
      }
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`preloader-3d ${fadingOut ? 'is-fading' : ''}`} aria-hidden="true">
      <div className="preloader-3d__content" style={{ width: 'min(100% - 2.5rem, 440px)' }}>
        {/* Startup Terminal Header */}
        <div style={{
          width: '100%',
          padding: '0.6rem 0.9rem',
          borderRadius: '8px 8px 0 0',
          border: '1px solid var(--line-strong)',
          borderBottom: '0',
          background: 'rgba(10, 16, 26, 0.95)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--mono)',
          fontSize: '0.62rem',
          color: 'var(--blue)',
        }}>
          <span>RD_SYSTEM_BOOT // INITIALIZATION</span>
          <span className="status-dot" />
        </div>

        {/* Startup Terminal Log Window */}
        <div style={{
          width: '100%',
          height: '130px',
          padding: '0.8rem 0.9rem',
          border: '1px solid var(--line-strong)',
          background: 'rgba(5, 8, 15, 0.95)',
          fontFamily: 'var(--mono)',
          fontSize: '0.63rem',
          color: 'var(--text-soft)',
          textAlign: 'left',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: '0.35rem',
        }}>
          {activeLogs.map((log, idx) => (
            <div key={idx} style={{
              color: log.includes('ONLINE') ? 'var(--mint)' : 'var(--blue)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {log}
            </div>
          ))}
        </div>

        {/* Progress Display */}
        <div style={{
          width: '100%',
          padding: '0.9rem 1rem',
          borderRadius: '0 0 8px 8px',
          border: '1px solid var(--line-strong)',
          borderTop: '0',
          background: 'rgba(10, 16, 26, 0.95)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>BOOT PROGRESS</span>
            <strong style={{ color: 'var(--blue)' }}>{progress}%</strong>
          </div>

          <div className="preloader-3d__bar-track" style={{ height: '5px' }}>
            <div className="preloader-3d__bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="preloader-3d__bg-grid" />
    </div>
  )
}
