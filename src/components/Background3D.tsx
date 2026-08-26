import { useEffect, useRef } from 'react'

export function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    const init = async () => {
      const THREE = await import('three')
      if (cancelled) return

      let renderer
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
      } catch {
        return
      }

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
      camera.position.z = 15

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setSize(window.innerWidth, window.innerHeight)

      const count = 160
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)

      const colorPalette = [
        new THREE.Color('#73a8ff'),
        new THREE.Color('#8be8c5'),
        new THREE.Color('#ad94ff'),
      ]

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 35
        positions[i * 3 + 1] = (Math.random() - 0.5) * 35
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20

        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        sizeAttenuation: true,
      })

      const particles = new THREE.Points(geometry, material)
      scene.add(particles)

      let animationFrame = 0
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener('resize', handleResize)

      const animate = (time: number) => {
        const elapsed = time * 0.0003
        particles.rotation.y = elapsed * 0.5
        particles.rotation.x = Math.sin(elapsed * 0.3) * 0.1
        renderer.render(scene, camera)
        animationFrame = requestAnimationFrame(animate)
      }

      animationFrame = requestAnimationFrame(animate)

      cleanup = () => {
        cancelAnimationFrame(animationFrame)
        window.removeEventListener('resize', handleResize)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
      }
    }

    void init()
    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return <canvas ref={canvasRef} className="global-3d-bg" aria-hidden="true" />
}
