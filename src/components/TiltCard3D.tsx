import { ReactNode, useRef } from 'react'

interface TiltCard3DProps {
  children: ReactNode
  className?: string
  maxTilt?: number
  scale?: number
}

export function TiltCard3D({
  children,
  className = '',
  maxTilt = 12,
  scale = 1.02,
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
  }

  const handlePointerLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-card-3d ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </div>
  )
}
