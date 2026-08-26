import { useEffect, useRef } from 'react'

export function About3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

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
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
      camera.position.set(0, 0, 5.8)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // 3D Developer Avatar Geometry - Nested Glowing Icosahedron & Orbiting Data Ring
      const outerGeo = new THREE.IcosahedronGeometry(1.2, 1)
      const outerMat = new THREE.MeshStandardMaterial({
        color: 0x73a8ff,
        emissive: 0x1769d8,
        emissiveIntensity: 1.2,
        wireframe: true,
      })
      const outerMesh = new THREE.Mesh(outerGeo, outerMat)
      scene.add(outerMesh)

      const innerGeo = new THREE.OctahedronGeometry(0.7, 0)
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0x8be8c5,
        emissive: 0x35d89b,
        emissiveIntensity: 2.2,
        metalness: 0.8,
        roughness: 0.2,
      })
      const innerMesh = new THREE.Mesh(innerGeo, innerMat)
      scene.add(innerMesh)

      // Orbiting Holographic Data Ring
      const ringGeo = new THREE.TorusGeometry(1.65, 0.03, 16, 64)
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xad94ff,
        emissive: 0x8e63ff,
        emissiveIntensity: 2.4,
      })
      const ringMesh = new THREE.Mesh(ringGeo, ringMat)
      ringMesh.rotation.x = Math.PI / 3
      scene.add(ringMesh)

      // Point Lights
      const pLight = new THREE.PointLight(0x8be8c5, 6, 8)
      pLight.position.set(2, 2, 3)
      scene.add(pLight)

      const aLight = new THREE.AmbientLight(0x73a8ff, 1.2)
      scene.add(aLight)

      const resize = () => {
        const { width, height } = container.getBoundingClientRect()
        if (!width || !height) return
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height, false)
      }

      window.addEventListener('resize', resize)
      resize()

      let animationFrame = 0
      const animate = (time: number) => {
        const elapsed = time * 0.001
        outerMesh.rotation.y = elapsed * 0.4
        outerMesh.rotation.x = Math.sin(elapsed * 0.3) * 0.2
        innerMesh.rotation.y = -elapsed * 0.6
        ringMesh.rotation.z = elapsed * 0.5
        renderer.render(scene, camera)
        animationFrame = requestAnimationFrame(animate)
      }

      animationFrame = requestAnimationFrame(animate)

      cleanup = () => {
        cancelAnimationFrame(animationFrame)
        window.removeEventListener('resize', resize)
        outerGeo.dispose()
        outerMat.dispose()
        innerGeo.dispose()
        innerMat.dispose()
        renderer.dispose()
      }
    }

    void init()
    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return (
    <div ref={containerRef} className="about-3d-viewer" aria-hidden="true">
      <canvas ref={canvasRef} className="about-3d-viewer__canvas" />
    </div>
  )
}
