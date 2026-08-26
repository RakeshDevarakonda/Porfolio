import { useEffect, useRef, useState } from 'react'

export function PuppyFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [isWalking, setIsWalking] = useState(false)
  const [barkText, setBarkText] = useState<string | null>(null)
  const [barkCount, setBarkCount] = useState(0)

  const mouseRef = useRef({ x: -100, y: -100 })
  const puppyRef = useRef({ x: -100, y: -100 })
  const animationFrameRef = useRef<number>(0)
  const idleTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const animate = () => {
      const targetX = mouseRef.current.x + 24
      const targetY = mouseRef.current.y + 24

      const dx = targetX - puppyRef.current.x
      const dy = targetY - puppyRef.current.y
      const dist = Math.hypot(dx, dy)

      if (dist > 6) {
        setIsWalking(true)
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
        idleTimeoutRef.current = window.setTimeout(() => setIsWalking(false), 180)

        if (dx < -3) setDirection('left')
        else if (dx > 3) setDirection('right')

        // Physics lerp follow movement speed
        puppyRef.current.x += dx * 0.085
        puppyRef.current.y += dy * 0.085

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
    const barks = ['Woof! 🐾', 'Arf Arf! ⚡', 'Cyber Pup! 🐕', '❤️ Wag!']
    const nextBark = barks[barkCount % barks.length]
    setBarkCount((c) => c + 1)
    setBarkText(nextBark)
    setTimeout(() => setBarkText(null), 1800)
  }

  if (pos.x < 0 || pos.y < 0) return null

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

      {/* SVG Animated Walking Puppy */}
      <div
        onClick={handlePuppyClick}
        style={{
          width: '42px',
          height: '34px',
          cursor: 'pointer',
          pointerEvents: 'auto',
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))',
        }}
        title="Cyber Puppy — Click to bark!"
      >
        <svg
          viewBox="0 0 64 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '100%',
            height: '100%',
            animation: isWalking ? 'puppy-walk-body 0.3s infinite alternate' : 'puppy-idle-body 2s infinite ease-in-out',
          }}
        >
          {/* Tail */}
          <path
            d="M12 24C8 18 4 16 2 12"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{
              transformOrigin: '12px 24px',
              animation: isWalking ? 'puppy-tail-wag 0.15s infinite alternate' : 'puppy-tail-idle 1s infinite alternate',
            }}
          />

          {/* Back Left Leg */}
          <path
            d="M18 32V46"
            stroke="#0284c7"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              transformOrigin: '18px 32px',
              animation: isWalking ? 'leg-swing-1 0.28s infinite alternate' : 'none',
            }}
          />

          {/* Back Right Leg */}
          <path
            d="M26 32V46"
            stroke="#0284c7"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              transformOrigin: '26px 32px',
              animation: isWalking ? 'leg-swing-2 0.28s infinite alternate' : 'none',
            }}
          />

          {/* Body */}
          <rect x="14" y="20" width="28" height="16" rx="8" fill="#38bdf8" />
          <rect x="16" y="22" width="24" height="12" rx="6" fill="#0284c7" opacity="0.4" />

          {/* Front Left Leg */}
          <path
            d="M34 32V46"
            stroke="#38bdf8"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              transformOrigin: '34px 32px',
              animation: isWalking ? 'leg-swing-2 0.28s infinite alternate' : 'none',
            }}
          />

          {/* Front Right Leg */}
          <path
            d="M40 32V46"
            stroke="#38bdf8"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              transformOrigin: '40px 32px',
              animation: isWalking ? 'leg-swing-1 0.28s infinite alternate' : 'none',
            }}
          />

          {/* Head */}
          <circle cx="44" cy="18" r="10" fill="#38bdf8" />

          {/* Floppy Ear */}
          <path
            d="M40 10C36 12 34 18 36 22"
            stroke="#0284c7"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              transformOrigin: '40px 10px',
              animation: isWalking ? 'ear-flop 0.25s infinite alternate' : 'none',
            }}
          />

          {/* Eye */}
          <circle cx="47" cy="16" r="1.8" fill="#090d16" />
          <circle cx="47.5" cy="15.5" r="0.6" fill="#ffffff" />

          {/* Snout & Nose */}
          <ellipse cx="51" cy="20" rx="4" ry="3" fill="#34d399" />
          <circle cx="53" cy="19" r="1.2" fill="#090d16" />
        </svg>
      </div>

      <style>{`
        @keyframes puppy-walk-body {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-3px) rotate(2deg); }
        }
        @keyframes puppy-idle-body {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes leg-swing-1 {
          0% { transform: rotate(-25deg); }
          100% { transform: rotate(25deg); }
        }
        @keyframes leg-swing-2 {
          0% { transform: rotate(25deg); }
          100% { transform: rotate(-25deg); }
        }
        @keyframes puppy-tail-wag {
          0% { transform: rotate(-15deg); }
          100% { transform: rotate(20deg); }
        }
        @keyframes puppy-tail-idle {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(8deg); }
        }
        @keyframes ear-flop {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-12deg); }
        }
      `}</style>
    </div>
  )
}
