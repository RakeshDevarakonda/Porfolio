import { useEffect, useRef, useState } from 'react'

export function SystemsScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [isThreeReady, setIsThreeReady] = useState(false)

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

      setIsThreeReady(true)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
      camera.position.set(0, 0, 7.5)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace

      // Master 3D Skills Globe Group
      const globeGroup = new THREE.Group()
      scene.add(globeGroup)

      // 1. Outer Hologram Wireframe Globe Sphere
      const globeGeo = new THREE.IcosahedronGeometry(2.5, 2)
      const globeMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.8,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      })
      const outerGlobe = new THREE.Mesh(globeGeo, globeMat)
      globeGroup.add(outerGlobe)

      // 2. Dual Orbital Rings
      const ring1Geo = new THREE.TorusGeometry(2.9, 0.025, 16, 100)
      const ring1Mat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 2.0,
      })
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
      ring1.rotation.x = Math.PI / 3
      globeGroup.add(ring1)

      const ring2Geo = new THREE.TorusGeometry(3.2, 0.02, 16, 100)
      const ring2Mat = new THREE.MeshStandardMaterial({
        color: 0x34d399,
        emissive: 0x34d399,
        emissiveIntensity: 1.8,
      })
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
      ring2.rotation.y = Math.PI / 4
      globeGroup.add(ring2)

      // 3. Floating 3D Skill Tech Nodes on Globe Surface
      const skillNodesData = [
        { name: 'Node.js', pos: new THREE.Vector3(-2.2, 1.2, 0.8), color: 0x38bdf8 },
        { name: 'Go (Golang)', pos: new THREE.Vector3(2.2, 1.4, 0.5), color: 0x34d399 },
        { name: 'PostgreSQL', pos: new THREE.Vector3(-1.8, -1.6, 1.2), color: 0xc084fc },
        { name: 'MongoDB', pos: new THREE.Vector3(1.9, -1.5, 0.9), color: 0x34d399 },
        { name: 'AWS SQS', pos: new THREE.Vector3(0, 2.3, -1.2), color: 0x38bdf8 },
        { name: 'WebSockets', pos: new THREE.Vector3(0, -2.4, -0.8), color: 0xc084fc },
      ]

      const nodeMeshes: InstanceType<typeof THREE.Mesh>[] = []

      skillNodesData.forEach((node) => {
        const nodeGeo = new THREE.OctahedronGeometry(0.32, 0)
        const nodeMat = new THREE.MeshStandardMaterial({
          color: node.color,
          emissive: node.color,
          emissiveIntensity: 2.5,
          metalness: 0.9,
          roughness: 0.1,
        })

        const mesh = new THREE.Mesh(nodeGeo, nodeMat)
        mesh.position.copy(node.pos)
        mesh.userData = node
        globeGroup.add(mesh)
        nodeMeshes.push(mesh)

        // Laser Conduits connecting to central core
        const points = [new THREE.Vector3(0, 0, 0), node.pos]
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
        const lineMat = new THREE.LineBasicMaterial({ color: node.color, transparent: true, opacity: 0.4 })
        const line = new THREE.Line(lineGeo, lineMat)
        globeGroup.add(line)
      })

      // 4. Central Energy Core
      const coreGeo = new THREE.IcosahedronGeometry(0.8, 1)
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 2.8,
      })
      const centerCore = new THREE.Mesh(coreGeo, coreMat)
      globeGroup.add(centerCore)

      // Lights
      const pointLight = new THREE.PointLight(0x38bdf8, 7, 14)
      pointLight.position.set(0, 0, 4)
      scene.add(pointLight)

      const ambientLight = new THREE.AmbientLight(0x38bdf8, 1.3)
      scene.add(ambientLight)

      // Mouse Raycaster
      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2(-100, -100)
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
        mouse.x = px
        mouse.y = py
        targetRotation.y = px * 0.45
        targetRotation.x = py * 0.3
      }

      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(container)
      container.addEventListener('pointermove', handlePointerMove, { passive: true })
      resize()

      let animationFrame = 0
      const animate = (time: number) => {
        const elapsed = time * 0.001

        outerGlobe.rotation.y = elapsed * 0.4
        outerGlobe.rotation.x = Math.sin(elapsed * 0.3) * 0.2
        centerCore.rotation.y = -elapsed * 0.8
        ring1.rotation.z = elapsed * 0.6
        ring2.rotation.z = -elapsed * 0.4

        globeGroup.rotation.y += (targetRotation.y - globeGroup.rotation.y) * 0.05
        globeGroup.rotation.x += (targetRotation.x - globeGroup.rotation.x) * 0.05

        // Raycasting
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(nodeMeshes)

        if (intersects.length > 0) {
          const hovered = intersects[0].object.userData.name as string
          if (hovered !== hoveredNode) setHoveredNode(hovered)
        } else if (hoveredNode !== null) {
          setHoveredNode(null)
        }

        renderer.render(scene, camera)
        animationFrame = requestAnimationFrame(animate)
      }

      animationFrame = requestAnimationFrame(animate)

      cleanup = () => {
        cancelAnimationFrame(animationFrame)
        resizeObserver.disconnect()
        container.removeEventListener('pointermove', handlePointerMove)
        globeGeo.dispose()
        globeMat.dispose()
        coreGeo.dispose()
        coreMat.dispose()
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
  }, [hoveredNode])

  return (
    <div
      ref={containerRef}
      className={`systems-scene ${isThreeReady ? 'systems-scene--ready' : ''}`}
      aria-label="3D Interactive Tech Skills Globe"
    >
      <canvas ref={canvasRef} className="systems-scene__canvas" />

      {/* Dynamic Hover HUD Overlay */}
      <div className="marvel-hero-hud">
        <span className="marvel-hero-hud__tag">3D TECH GLOBE // HERO CORE</span>
        <strong className="marvel-hero-hud__title">
          {hoveredNode ? hoveredNode.toUpperCase() : 'SYSTEM ARCHITECTURE GLOBE'}
        </strong>
        <span className="marvel-hero-hud__detail">
          {hoveredNode ? `Active Microservice Endpoint · ${hoveredNode}` : 'Interactive 3D Skills Sphere · Hover to inspect endpoints'}
        </span>
      </div>
    </div>
  )
}
