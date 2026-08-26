import { useEffect, useRef, useState } from 'react'

export function About3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    const init = async () => {
      const THREE = await import('three')
      if (cancelled) return

      let renderer: InstanceType<typeof THREE.WebGLRenderer>
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      } catch {
        return
      }

      setIsReady(true)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
      camera.position.set(0, 0, 7)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace

      // Master Identity Core Group
      const coreGroup = new THREE.Group()
      scene.add(coreGroup)

      // 1. Holographic Cybernetic Identity Cube
      const cubeGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4)
      const cubeMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.8,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      })
      const outerCube = new THREE.Mesh(cubeGeo, cubeMat)
      coreGroup.add(outerCube)

      // 2. Inner Golden Octahedron Core
      const innerGeo = new THREE.OctahedronGeometry(1.0, 0)
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xfbbf24,
        emissiveIntensity: 2.2,
        metalness: 0.9,
        roughness: 0.1,
      })
      const innerCore = new THREE.Mesh(innerGeo, innerMat)
      coreGroup.add(innerCore)

      // 3. Orbital Ring 1
      const ring1Geo = new THREE.TorusGeometry(2.8, 0.025, 16, 100)
      const ring1Mat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 2.0,
      })
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
      ring1.rotation.x = Math.PI / 3
      coreGroup.add(ring1)

      // 4. Orbital Ring 2
      const ring2Geo = new THREE.TorusGeometry(3.1, 0.02, 16, 100)
      const ring2Mat = new THREE.MeshStandardMaterial({
        color: 0x34d399,
        emissive: 0x34d399,
        emissiveIntensity: 1.8,
      })
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
      ring2.rotation.y = Math.PI / 4
      coreGroup.add(ring2)

      // 5. 2D Canvas Text Sprite — "DEVARAKONDA RAKESH"
      const textCanvas = document.createElement('canvas')
      textCanvas.width = 384
      textCanvas.height = 64
      const ctx = textCanvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#fbbf24'
        ctx.font = 'bold 22px DM Mono, monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('RAKESH DEVARAKONDA', 192, 32)
      }
      const textTexture = new THREE.CanvasTexture(textCanvas)
      const spriteMat = new THREE.SpriteMaterial({ map: textTexture, transparent: true })
      const textSprite = new THREE.Sprite(spriteMat)
      textSprite.position.set(0, -1.8, 0)
      textSprite.scale.set(3.2, 0.55, 1)
      coreGroup.add(textSprite)

      // Lights
      const pointLight = new THREE.PointLight(0xfbbf24, 6, 12)
      pointLight.position.set(0, 0, 4)
      scene.add(pointLight)

      const ambientLight = new THREE.AmbientLight(0x38bdf8, 1.2)
      scene.add(ambientLight)

      // Mouse tracking
      const targetRotation = new THREE.Vector2()

      const resize = () => {
        const { width, height } = container.getBoundingClientRect()
        if (!width || !height) return
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height, false)
      }

      const handlePointerMove = (e: PointerEvent) => {
        const bounds = container.getBoundingClientRect()
        const px = ((e.clientX - bounds.left) / bounds.width) * 2 - 1
        const py = -((e.clientY - bounds.top) / bounds.height) * 2 + 1
        targetRotation.y = px * 0.4
        targetRotation.x = py * 0.25
      }

      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(container)
      container.addEventListener('pointermove', handlePointerMove, { passive: true })
      resize()

      let animationFrame = 0
      const animate = (time: number) => {
        const elapsed = time * 0.001

        outerCube.rotation.y = elapsed * 0.6
        outerCube.rotation.x = Math.sin(elapsed * 0.4) * 0.3
        innerCore.rotation.y = -elapsed * 0.9
        innerCore.rotation.z = elapsed * 0.5

        ring1.rotation.z = elapsed * 0.7
        ring2.rotation.z = -elapsed * 0.5

        coreGroup.rotation.y += (targetRotation.y - coreGroup.rotation.y) * 0.05
        coreGroup.rotation.x += (targetRotation.x - coreGroup.rotation.x) * 0.05

        renderer.render(scene, camera)
        animationFrame = requestAnimationFrame(animate)
      }

      animationFrame = requestAnimationFrame(animate)

      cleanup = () => {
        cancelAnimationFrame(animationFrame)
        resizeObserver.disconnect()
        container.removeEventListener('pointermove', handlePointerMove)
        cubeGeo.dispose()
        cubeMat.dispose()
        innerGeo.dispose()
        innerMat.dispose()
        ring1Geo.dispose()
        ring1Mat.dispose()
        ring2Geo.dispose()
        ring2Mat.dispose()
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
    <div ref={containerRef} className={`about-3d-viewer ${isReady ? 'about-3d-viewer--ready' : ''}`} aria-label="3D Developer Identity Cyber Core">
      <canvas ref={canvasRef} className="about-3d-viewer__canvas" />
    </div>
  )
}
