import { useEffect, useRef } from 'react'

export function Full3DWorld() {
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
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      } catch {
        return
      }

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
      camera.position.set(0, 2, 12)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.outputColorSpace = THREE.SRGBColorSpace

      // 1. Cybernetic Server Towers / Monoliths
      const towersGroup = new THREE.Group()
      scene.add(towersGroup)

      const towerCount = 28
      const towerGeom = new THREE.BoxGeometry(0.8, 4.5, 0.8)
      const towerEdgeMat = new THREE.LineBasicMaterial({ color: 0x73a8ff, transparent: true, opacity: 0.35 })

      for (let i = 0; i < towerCount; i++) {
        const mat = new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0x0e1726 : 0x0b131e,
          metalness: 0.85,
          roughness: 0.15,
          transparent: true,
          opacity: 0.7,
        })
        const tower = new THREE.Mesh(towerGeom, mat)

        const x = (Math.random() - 0.5) * 38
        const z = (Math.random() - 0.5) * 45 - 5
        const y = (Math.random() - 0.5) * 4 - 2

        tower.position.set(x, y, z)
        tower.scale.set(1, 1 + Math.random() * 1.8, 1)

        const wire = new THREE.LineSegments(new THREE.EdgesGeometry(towerGeom), towerEdgeMat)
        tower.add(wire)

        towersGroup.add(tower)
      }

      // 2. Glowing Horizon Grid Floor
      const grid = new THREE.GridHelper(60, 30, 0x73a8ff, 0x1e3a8a)
      grid.position.y = -6
      if (Array.isArray(grid.material)) {
        grid.material.forEach((m) => {
          m.transparent = true
          m.opacity = 0.25
        })
      } else {
        grid.material.transparent = true
        grid.material.opacity = 0.25
      }
      scene.add(grid)

      // 3. Floating 3D Data Streams (Particles)
      const particleCount = 250
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)

      const palette = [new THREE.Color(0x73a8ff), new THREE.Color(0x8be8c5), new THREE.Color(0xad94ff)]

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 40
        positions[i * 3 + 1] = (Math.random() - 0.5) * 30
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40

        const c = palette[i % palette.length]
        colors[i * 3] = c.r
        colors[i * 3 + 1] = c.g
        colors[i * 3 + 2] = c.b
      }

      const particleGeo = new THREE.BufferGeometry()
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const particleMat = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
      })

      const particles = new THREE.Points(particleGeo, particleMat)
      scene.add(particles)

      // 4. Lights
      const cyanLight = new THREE.PointLight(0x73a8ff, 8, 25)
      cyanLight.position.set(5, 5, 5)
      scene.add(cyanLight)

      const mintLight = new THREE.PointLight(0x8be8c5, 6, 20)
      mintLight.position.set(-5, -5, 0)
      scene.add(mintLight)

      const ambientLight = new THREE.AmbientLight(0x4b729f, 1.2)
      scene.add(ambientLight)

      // 5. Scroll-driven Camera Motion Spline Interpolation
      let targetCamY = 2
      let targetCamZ = 12
      let targetCamRotX = 0

      const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0

        // Move camera deeper into the 3D server landscape as user scrolls
        targetCamY = 2 - progress * 8
        targetCamZ = 12 - progress * 15
        targetCamRotX = -progress * 0.25
      }

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize)

      let animationFrame = 0
      const animate = (time: number) => {
        const elapsed = time * 0.0004

        // Smooth camera lerp
        camera.position.y += (targetCamY - camera.position.y) * 0.05
        camera.position.z += (targetCamZ - camera.position.z) * 0.05
        camera.rotation.x += (targetCamRotX - camera.rotation.x) * 0.05

        // Rotate scene elements
        towersGroup.rotation.y = elapsed * 0.3
        particles.rotation.y = elapsed * 0.4
        grid.position.z = (elapsed * 2) % 2

        renderer.render(scene, camera)
        animationFrame = requestAnimationFrame(animate)
      }

      animationFrame = requestAnimationFrame(animate)

      cleanup = () => {
        cancelAnimationFrame(animationFrame)
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
        particleGeo.dispose()
        particleMat.dispose()
        towerGeom.dispose()
        towerEdgeMat.dispose()
        renderer.dispose()
      }
    }

    void init()
    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return <canvas ref={canvasRef} className="full-3d-world-canvas" aria-hidden="true" />
}
