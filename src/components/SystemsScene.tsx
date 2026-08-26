import { useEffect, useRef, useState } from 'react'

interface SkillEndpoint {
  name: string
  detail: string
  color: number
  pos: [number, number, number]
}

const heroEndpoints: SkillEndpoint[] = [
  { name: 'NODE.JS / EXPRESS', detail: 'High-Scale REST APIs & Auth Routing', color: 0x38bdf8, pos: [-2.1, 1.3, 0.9] },
  { name: 'GO / GIN MICROSERVICES', detail: 'High-Concurrency Processing Core', color: 0x34d399, pos: [2.2, 1.2, 0.7] },
  { name: 'POSTGRESQL DB', detail: 'Multi-Tenant Granular RBAC & ACID', color: 0xc084fc, pos: [-1.9, -1.5, 1.1] },
  { name: 'MONGODB ATLAS', detail: 'Document Aggregations & Workspaces', color: 0x34d399, pos: [1.9, -1.6, 0.8] },
  { name: 'AWS SQS & LAMBDA', detail: 'Event-Driven Serverless Pipelines', color: 0x38bdf8, pos: [0, 2.4, -1.1] },
  { name: 'WEBSOCKET ENGINE', detail: 'Sub-100ms Speech & State Sync', color: 0xc084fc, pos: [0, -2.4, -0.9] },
]

export function SystemsScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredEndpoint, setHoveredEndpoint] = useState<SkillEndpoint | null>(null)
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
      camera.position.set(0, 0, 7.6)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace

      // Master Globe Group
      const globeGroup = new THREE.Group()
      scene.add(globeGroup)

      // 1. High-Density Holographic Globe Sphere
      const globeGeo = new THREE.IcosahedronGeometry(2.5, 3)
      const globeMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.6,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      })
      const outerGlobe = new THREE.Mesh(globeGeo, globeMat)
      globeGroup.add(outerGlobe)

      // 2. Latitude & Longitude Orbital Rings
      const ring1Geo = new THREE.TorusGeometry(2.95, 0.02, 16, 100)
      const ring1Mat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 2.0,
      })
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
      ring1.rotation.x = Math.PI / 3
      globeGroup.add(ring1)

      const ring2Geo = new THREE.TorusGeometry(3.25, 0.018, 16, 100)
      const ring2Mat = new THREE.MeshStandardMaterial({
        color: 0x34d399,
        emissive: 0x34d399,
        emissiveIntensity: 1.8,
      })
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
      ring2.rotation.y = Math.PI / 4
      globeGroup.add(ring2)

      // 3. Endpoint Crystal Nodes
      const nodeMeshes: InstanceType<typeof THREE.Mesh>[] = []

      heroEndpoints.forEach((ep) => {
        const nodeGeo = new THREE.OctahedronGeometry(0.32, 0)
        const nodeMat = new THREE.MeshStandardMaterial({
          color: ep.color,
          emissive: ep.color,
          emissiveIntensity: 2.6,
          metalness: 0.9,
          roughness: 0.1,
        })

        const mesh = new THREE.Mesh(nodeGeo, nodeMat)
        mesh.position.set(...ep.pos)
        mesh.userData = ep
        globeGroup.add(mesh)
        nodeMeshes.push(mesh)

        // Laser Conduits to Core
        const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...ep.pos)]
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
        const lineMat = new THREE.LineBasicMaterial({ color: ep.color, transparent: true, opacity: 0.35 })
        const line = new THREE.Line(lineGeo, lineMat)
        globeGroup.add(line)
      })

      // 4. Central Core
      const coreGeo = new THREE.OctahedronGeometry(0.75, 1)
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

        outerGlobe.rotation.y = elapsed * 0.35
        outerGlobe.rotation.x = Math.sin(elapsed * 0.25) * 0.15
        centerCore.rotation.y = -elapsed * 0.8
        ring1.rotation.z = elapsed * 0.5
        ring2.rotation.z = -elapsed * 0.35

        globeGroup.rotation.y += (targetRotation.y - globeGroup.rotation.y) * 0.05
        globeGroup.rotation.x += (targetRotation.x - globeGroup.rotation.x) * 0.05

        // Raycast logic
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(nodeMeshes)

        let currentHover: SkillEndpoint | null = null

        nodeMeshes.forEach((mesh) => {
          const epData = mesh.userData as SkillEndpoint
          const isHovered = intersects.length > 0 && intersects[0].object === mesh

          if (isHovered) currentHover = epData

          const targetScale = isHovered ? 1.5 : 1.0
          mesh.scale.setScalar(mesh.scale.x + (targetScale - mesh.scale.x) * 0.1)
          mesh.rotation.y += 0.02
        })

        if (currentHover !== hoveredEndpoint) {
          setHoveredEndpoint(currentHover)
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
  }, [hoveredEndpoint])

  return (
    <div
      ref={containerRef}
      className={`systems-scene ${isReady ? 'systems-scene--ready' : ''}`}
      aria-label="3D Interactive Architecture Globe"
    >
      <canvas ref={canvasRef} className="systems-scene__canvas" />
    </div>
  )
}
