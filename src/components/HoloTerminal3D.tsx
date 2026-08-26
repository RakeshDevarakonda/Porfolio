import { useEffect, useRef } from 'react'

export function HoloTerminal3D() {
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
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
      camera.position.set(0, 0, 5.5)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))

      // 3D Holographic Cylinder Emitter Base
      const baseGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.25, 32)
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x102030,
        emissive: 0x1769d8,
        emissiveIntensity: 0.8,
        metalness: 0.9,
        roughness: 0.1,
      })
      const baseMesh = new THREE.Mesh(baseGeo, baseMat)
      baseMesh.position.y = -1.5
      scene.add(baseMesh)

      // Base Emitter Glow Ring
      const ringGeo = new THREE.TorusGeometry(1.62, 0.03, 16, 64)
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x8be8c5,
        emissive: 0x8be8c5,
        emissiveIntensity: 2.5,
      })
      const ringMesh = new THREE.Mesh(ringGeo, ringMat)
      ringMesh.rotation.x = Math.PI / 2
      ringMesh.position.y = -1.36
      scene.add(ringMesh)

      // Holographic Light Cone
      const coneGeo = new THREE.CylinderGeometry(2.1, 1.6, 2.6, 32, 1, true)
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0x73a8ff,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
      })
      const coneMesh = new THREE.Mesh(coneGeo, coneMat)
      coneMesh.position.y = -0.1
      scene.add(coneMesh)

      // Floating Holographic Core Box
      const boxGeo = new THREE.BoxGeometry(2.2, 1.4, 0.2)
      const boxMat = new THREE.MeshPhysicalMaterial({
        color: 0x73a8ff,
        metalness: 0.3,
        roughness: 0.1,
        transmission: 0.4,
        transparent: true,
        opacity: 0.3,
      })
      const boxMesh = new THREE.Mesh(boxGeo, boxMat)
      boxMesh.position.y = 0.2
      scene.add(boxMesh)

      const boxEdgeMat = new THREE.LineBasicMaterial({ color: 0x8be8c5, transparent: true, opacity: 0.8 })
      const boxEdges = new THREE.LineSegments(new THREE.EdgesGeometry(boxGeo), boxEdgeMat)
      boxMesh.add(boxEdges)

      // Lighting
      const light = new THREE.PointLight(0x8be8c5, 6, 8)
      light.position.set(0, -0.5, 2)
      scene.add(light)

      const resize = () => {
        const { width, height } = canvas.parentElement?.getBoundingClientRect() || { width: 300, height: 200 }
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height, false)
      }

      window.addEventListener('resize', resize)
      resize()

      let animationFrame = 0
      const animate = (time: number) => {
        const elapsed = time * 0.001
        boxMesh.position.y = 0.2 + Math.sin(elapsed * 2) * 0.08
        boxMesh.rotation.y = Math.sin(elapsed * 1.2) * 0.18
        ringMesh.rotation.z = elapsed * 0.5
        renderer.render(scene, camera)
        animationFrame = requestAnimationFrame(animate)
      }

      animationFrame = requestAnimationFrame(animate)

      cleanup = () => {
        cancelAnimationFrame(animationFrame)
        window.removeEventListener('resize', resize)
        baseGeo.dispose()
        baseMat.dispose()
        boxGeo.dispose()
        boxMat.dispose()
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
    <div className="holo-terminal-3d-wrapper">
      <canvas ref={canvasRef} className="holo-terminal-3d-canvas" />
    </div>
  )
}
