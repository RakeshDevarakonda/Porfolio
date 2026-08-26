import { useEffect, useRef, useState } from 'react'

export function BirdFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [isFlying, setIsFlying] = useState(false)
  const [flapPhase, setFlapPhase] = useState(0)
  const [chirpText, setChirpText] = useState<string | null>(null)
  const [chirpCount, setChirpCount] = useState(0)

  const mouseRef = useRef({ x: -100, y: -100 })
  const birdRef = useRef({ x: -100, y: -100 })
  const animationFrameRef = useRef<number>(0)
  const idleTimeoutRef = useRef<number | null>(null)
  const flapTimeRef = useRef<number>(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const animate = () => {
      const targetX = mouseRef.current.x + 28
      const targetY = mouseRef.current.y - 28 // Flies slightly above cursor

      const dx = targetX - birdRef.current.x
      const dy = targetY - birdRef.current.y
      const dist = Math.hypot(dx, dy)

      if (dist > 5) {
        setIsFlying(true)
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
        idleTimeoutRef.current = window.setTimeout(() => setIsFlying(false), 200)

        if (dx < -3) setDirection('left')
        else if (dx > 3) setDirection('right')

        // Gentle, smooth flight follow speed
        birdRef.current.x += dx * 0.055
        birdRef.current.y += dy * 0.055

        // Wing flap phase angle
        flapTimeRef.current += 0.22
        setFlapPhase(flapTimeRef.current)

        setPos({ x: birdRef.current.x, y: birdRef.current.y })
      } else {
        setIsFlying(false)
        flapTimeRef.current += 0.05
        setFlapPhase(flapTimeRef.current)
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

  const handleBirdClick = () => {
    const chirps = ['Chirp Chirp! 🐤', 'Tweet! ⚡', 'Cyber Bird Online! 🕊️', '❤️ Sky Companion!']
    const nextChirp = chirps[chirpCount % chirps.length]
    setChirpCount((c) => c + 1)
    setChirpText(nextChirp)
    setTimeout(() => setChirpText(null), 1800)
  }

  if (pos.x < 0 || pos.y < 0) return null

  // Calculate wing flap rotation angle in degrees
  const wingAngle = isFlying ? Math.sin(flapPhase * 2.5) * 38 : Math.sin(flapPhase) * 12
  const floatBob = Math.sin(Date.now() * 0.004) * -3

  return (
    <div
      className="bird-follower-container"
      style={{
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: `translate(-50%, -50%) scaleX(${direction === 'left' ? -1 : 1})`,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      {/* Chirp Speech Bubble */}
      {chirpText ? (
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
          {chirpText}
        </div>
      ) : null}

      {/* SVG Animated Flying Bird */}
      <div
        onClick={handleBirdClick}
        style={{
          width: '46px',
          height: '38px',
          cursor: 'pointer',
          pointerEvents: 'auto',
          filter: 'drop-shadow(0 4px 12px rgba(56, 189, 248, 0.4))',
        }}
        title="Cyber Bird Companion — Click to chirp!"
      >
        <svg
          viewBox="0 0 64 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '100%',
            height: '100%',
            transform: `translateY(${floatBob}px)`,
          }}
        >
          {/* Tail Feathers */}
          <path d="M12 26L2 20L8 28L2 34Z" fill="#38bdf8" />

          {/* Back Wing */}
          <path
            d="M26 24C22 10 32 2 40 4C36 14 30 20 26 24Z"
            fill="#0284c7"
            style={{
              transformOrigin: '26px 24px',
              transform: `rotate(${-wingAngle}deg)`,
            }}
          />

          {/* Bird Body */}
          <path d="M10 26C10 18 20 14 34 16C46 18 52 24 50 32C46 40 28 42 18 36C12 32 10 28 10 26Z" fill="#38bdf8" />
          <path d="M16 26C18 32 28 36 38 34C44 32 46 28 42 26C32 24 22 24 16 26Z" fill="#34d399" opacity="0.8" />

          {/* Front Flapping Wing */}
          <path
            d="M28 26C24 8 36 -2 46 2C40 14 32 22 28 26Z"
            fill="#34d399"
            style={{
              transformOrigin: '28px 26px',
              transform: `rotate(${wingAngle}deg)`,
            }}
          />

          {/* Bird Head */}
          <circle cx="48" cy="20" r="9" fill="#38bdf8" />

          {/* Eye */}
          <circle cx="51" cy="18" r="2.2" fill="#090d16" />
          <circle cx="51.7" cy="17.3" r="0.8" fill="#ffffff" />

          {/* Beak */}
          <path d="M56 20L64 23L56 26Z" fill="#fbbf24" />
        </svg>
      </div>
    </div>
  )
}
