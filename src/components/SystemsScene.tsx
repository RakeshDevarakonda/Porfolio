import { useEffect, useRef, useState } from 'react'
import type * as THREE from 'three'

interface ServiceNodeData {
  label: string
  detail: string
  color: number
  position: [number, number, number]
}

const serviceNodes: ServiceNodeData[] = [
  { label: 'WebSockets', detail: 'Sub-100ms Live Stream', color: 0x38bdf8, position: [-2.6, 1.4, 0.4] },
  { label: 'PostgreSQL', detail: 'RBAC / Multi-Tenant DB', color: 0xa855f7, position: [2.6, 1.4, -0.4] },
  { label: 'AWS SQS', detail: 'Event-Driven Pipeline', color: 0xfbbf24, position: [-2.6, -1.4, -0.4] },
  { label: 'REST APIs', detail: 'Go & Node Microservices', color: 0x34d399, position: [2.6, -1.4, 0.4] },
]

export function SystemsScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeNode, setActiveNode] = useState<ServiceNodeData | null>(null)
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

      let renderer: THREE.WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      } catch {
        return
      }

      setIsThreeReady(true)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
      camera.position.set(0, 0, 7.8)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace

      const masterGroup = new THREE.Group()
      scene.add(masterGroup)

      // --- STARK ARC REACTOR 3D CORE ---
      // 1. Central Arc Reactor Core Specimen
      const coreGeo = new THREE.OctahedronGeometry(1.0, 2)
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 2.5,
        metalness: 0.9,
        roughness: 0.1,
      })
      const coreMesh = new THREE.Mesh(coreGeo, coreMat)
      masterGroup.add(coreMesh)

      // 2. Outer Arc Reactor Wireframe Cage
      const cageGeo = new THREE.IcosahedronGeometry(1.28, 1)
      const cageMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xd97706,
        emissiveIntensity: 1.8,
        wireframe: true,
      })
      const cageMesh = new THREE.Mesh(cageGeo, cageMat)
      masterGroup.add(cageMesh)

      // 3. Concentric Spinning Stark Reactor Rings
      const ringMat1 = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 3.0 })
      const ringGeo1 = new THREE.TorusGeometry(1.6, 0.04, 16, 64)
      const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1)
      ringMesh1.rotation.x = Math.PI / 3
      masterGroup.add(ringMesh1)

      const ringMat2 = new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 2.8 })
      const ringGeo2 = new THREE.TorusGeometry(1.85, 0.03, 16, 64)
      const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2)
      ringMesh2.rotation.y = Math.PI / 4
      masterGroup.add(ringMesh2)

      // --- ORBITING STARK SERVICE NODES & ENERGY LASERS ---
      const nodeMeshes: THREE.Mesh[] = []

      serviceNodes.forEach((node) => {
        const nodeGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.2, 6)
        const nodeMat = new THREE.MeshStandardMaterial({
          color: node.color,
          emissive: node.color,
          emissiveIntensity: 2.0,
          metalness: 0.8,
          roughness: 0.2,
        })
        const mesh = new THREE.Mesh(nodeGeo, nodeMat)
        mesh.position.set(...node.position)
        mesh.rotation.x = Math.PI / 4
        mesh.userData = node
        masterGroup.add(mesh)
        nodeMeshes.push(mesh)

        // Laser Plasma Beam Conduit
        const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...node.position)]
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
        const lineMat = new THREE.LineBasicMaterial({ color: node.color, transparent: true, opacity: 0.7 })
        const line = new THREE.Line(lineGeo, lineMat)
        masterGroup.add(line)
      })

      // Point & Ambient Lights
      const reactorLight = new THREE.PointLight(0x38bdf8, 8, 12)
      reactorLight.position.set(0, 0, 2)
      scene.add(reactorLight)

      const goldLight = new THREE.PointLight(0xfbbf24, 6, 10)
      goldLight.position.set(0, 2, 3)
      scene.add(goldLight)

      const ambientLight = new THREE.AmbientLight(0x38bdf8, 1.2)
      scene.add(ambientLight)

      // Raycaster for Hovering Stark Nodes
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

        coreMesh.rotation.y = elapsed * 0.8
        coreMesh.rotation.x = Math.sin(elapsed * 0.5) * 0.3
        cageMesh.rotation.y = -elapsed * 0.6

        ringMesh1.rotation.z = elapsed * 0.9
        ringMesh2.rotation.z = -elapsed * 0.7

        masterGroup.rotation.y += (targetRotation.y - masterGroup.rotation.y) * 0.05
        masterGroup.rotation.x += (targetRotation.x - masterGroup.rotation.x) * 0.05

        // Raycasting
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(nodeMeshes)

        let hovered: ServiceNodeData | null = null

        nodeMeshes.forEach((m) => {
          const isHover = intersects.length > 0 && intersects[0].object === m
          if (isHover) hovered = m.userData as ServiceNodeData
          const scale = isHover ? 1.4 : 1.0 + Math.sin(elapsed * 3 + m.position.x) * 0.06
          m.scale.setScalar(scale)
          m.rotation.y += 0.02
        })

        if (hovered !== activeNode) setActiveNode(hovered)

        renderer.render(scene, camera)
        animationFrame = requestAnimationFrame(animate)
      }

      animationFrame = requestAnimationFrame(animate)

      cleanup = () => {
        cancelAnimationFrame(animationFrame)
        resizeObserver.disconnect()
        container.removeEventListener('pointermove', handlePointerMove)
        coreGeo.dispose()
        coreMat.dispose()
        cageGeo.dispose()
        cageMat.dispose()
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
    <div
      ref={containerRef}
      className={`systems-scene ${isThreeReady ? 'systems-scene--ready' : ''}`}
      aria-label="3D Stark Arc Reactor Microservice Architecture"
    >
      <img
        src="/assets/system-core.png"
        alt="Stark Arc Reactor Microservice System Core"
        className="systems-scene__fallback"
      />
      <canvas ref={canvasRef} className="systems-scene__canvas" />

      {activeNode ? (
        <div className="systems-scene-hud">
          <span className="systems-scene-hud__tag">STARK NODE ACTIVE</span>
          <strong className="systems-scene-hud__title">{activeNode.label}</strong>
          <span className="systems-scene-hud__detail">{activeNode.detail}</span>
        </div>
      ) : null}
    </div>
  )
}
