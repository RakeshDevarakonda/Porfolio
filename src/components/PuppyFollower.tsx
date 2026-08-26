import { useEffect, useRef, useState } from 'react'

export function PuppyFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [isWalking, setIsWalking] = useState(false)
  const [walkPhase, setWalkPhase] = useState(0)
  const [barkText, setBarkText] = useState<string | null>(null)
  const [barkCount, setBarkCount] = useState(0)

  const mouseRef = useRef({ x: -100, y: -100 })
  const puppyRef = useRef({ x: -100, y: -100 })
  const animationFrameRef = useRef<number>(0)
  const idleTimeoutRef = useRef<number | null>(null)
  const stepTimeRef = useRef<number>(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const animate = () => {
      const targetX = mouseRef.current.x + 30
      const targetY = mouseRef.current.y + 30

      const dx = targetX - puppyRef.current.x
      const dy = targetY - puppyRef.current.y
      const dist = Math.hypot(dx, dy)

      if (dist > 6) {
        setIsWalking(true)
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
        idleTimeoutRef.current = window.setTimeout(() => setIsWalking(false), 180)

        if (dx < -3) setDirection('left')
        else if (dx > 3) setDirection('right')

        // Smooth, gentle normal walking speed (0.045 lerp factor)
        puppyRef.current.x += dx * 0.045
        puppyRef.current.y += dy * 0.045

        // Relaxed natural walking step frequency
        stepTimeRef.current += 0.14
        setWalkPhase(stepTimeRef.current)

        setPos({ x: puppyRef.current.x, y: puppyRef.current.y })
      } else {
        setIsWalking(false)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameRef.current)
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
    }
  }, [])

  const handlePuppyClick = () => {
    const barks = ['Woof! 🐾', 'Arf Arf! ⚡', 'White Pup! 🐕', '❤️ Happy Bark!']
    const nextBark = barks[barkCount % barks.length]
    setBarkCount((c) => c + 1)
    setBarkText(nextBark)
    setTimeout(() => setBarkText(null), 1800)
  }

  if (pos.x < 0 || pos.y < 0) return null

  // Calculate 4-leg trotting gait rotations in degrees for normal walking pace
  const leg1Rot = isWalking ? Math.sin(walkPhase) * 24 : 0 // Front Left & Back Right
  const leg2Rot = isWalking ? -Math.sin(walkPhase) * 24 : 0 // Front Right & Back Left
  const bodyBob = isWalking ? Math.abs(Math.sin(walkPhase * 2)) * -2.5 : Math.sin(Date.now() * 0.003) * -1.2
  const tailWag = isWalking ? Math.sin(walkPhase * 2) * 20 : Math.sin(Date.now() * 0.004) * 8
  const earFlop = isWalking ? Math.sin(walkPhase) * 10 : 0

  return (
    <div
      className="puppy-follower-container"
      style={{
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: `translate(-50%, -50%) scaleX(${direction === 'left' ? -1 : 1})`,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      {/* Bark Speech Bubble */}
      {barkText ? (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: `translateX(-50%) scaleX(${direction === 'left' ? -1 : 1})`,
            marginBottom: '8px',
            padding: '3px 8px',
            borderRadius: '6px',
            border: '1px solid var(--blue)',
            background: 'rgba(8, 14, 24, 0.95)',
            color: 'var(--mint)',
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 12px rgba(56, 189, 248, 0.4)',
            pointerEvents: 'none',
          }}
        >
          {barkText}
        </div>
      ) : null}

      {/* SVG Animated Fluffy White Walking Puppy */}
      <div
        onClick={handlePuppyClick}
        style={{
          width: '48px',
          height: '40px',
          cursor: 'pointer',
          pointerEvents: 'auto',
          filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.6))',
        }}
        title="Fluffy White Cyber Puppy — Click to bark!"
      >
        <svg
          viewBox="0 0 64 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '100%',
            height: '100%',
            transform: `translateY(${bodyBob}px)`,
          }}
        >
          {/* Wagging White Tail with Fluffy Tip */}
          <path
            d="M12 24C8 18 4 16 2 12"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              transformOrigin: '12px 24px',
              transform: `rotate(${tailWag}deg)`,
            }}
          />
          <circle cx="2" cy="12" r="2.5" fill="#38bdf8" />

          {/* Back Left Leg */}
          <g style={{ transformOrigin: '18px 32px', transform: `rotate(${leg1Rot}deg)` }}>
            <path d="M18 32V46" stroke="#e2e8f0" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="18" cy="46" r="2.5" fill="#38bdf8" />
          </g>

          {/* Back Right Leg */}
          <g style={{ transformOrigin: '26px 32px', transform: `rotate(${leg2Rot}deg)` }}>
            <path d="M26 32V46" stroke="#e2e8f0" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="26" cy="46" r="2.5" fill="#38bdf8" />
          </g>

          {/* White Fluffy Body */}
          <rect x="14" y="20" width="28" height="16" rx="8" fill="#ffffff" />
          <rect x="16" y="22" width="24" height="12" rx="6" fill="#f1f5f9" />

          {/* Front Left Leg */}
          <g style={{ transformOrigin: '34px 32px', transform: `rotate(${leg2Rot}deg)` }}>
            <path d="M34 32V46" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="34" cy="46" r="2.5" fill="#34d399" />
          </g>

          {/* Front Right Leg */}
          <g style={{ transformOrigin: '40px 32px', transform: `rotate(${leg1Rot}deg)` }}>
            <path d="M40 32V46" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="40" cy="46" r="2.5" fill="#34d399" />
          </g>

          {/* White Head */}
          <circle cx="44" cy="18" r="10.5" fill="#ffffff" />

          {/* Fluffy Ear */}
          <path
            d="M40 10C36 12 34 18 36 22"
            stroke="#38bdf8"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              transformOrigin: '40px 10px',
              transform: `rotate(${earFlop}deg)`,
            }}
          />

          {/* Eye */}
          <circle cx="47" cy="16" r="2" fill="#090d16" />
          <circle cx="47.6" cy="15.4" r="0.7" fill="#ffffff" />

          {/* Cute Nose & Pink Tongue */}
          <ellipse cx="51" cy="20" rx="3.5" ry="2.5" fill="#f472b6" />
          <circle cx="53" cy="19" r="1.3" fill="#090d16" />
        </svg>
      </div>
    </div>
  )
}
