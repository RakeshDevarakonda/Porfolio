import { useEffect, useRef } from 'react'
import type * as THREE from 'three'

function disposeScene(scene: THREE.Scene) {
  scene.traverse((object) => {
    const mesh = object as THREE.Mesh
    if (mesh.geometry) mesh.geometry.dispose()

    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((material) => material.dispose())
    } else if (mesh.material) {
      mesh.material.dispose()
    }
  })
}

export function SystemsScene() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = sceneRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    const init = async () => {
      const THREE = await import('three')
      if (cancelled) return

      let renderer: THREE.WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        })
      } catch {
        return
      }

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
      camera.position.set(2.8, 2.0, 7.2)
      camera.lookAt(0, 0, 0)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.15
      container.classList.add('systems-scene--ready')

      // Main System Cluster Group
      const cluster = new THREE.Group()
      cluster.position.set(0, -0.1, 0)
      scene.add(cluster)

      // 1. Central Core: Glowing Dodecahedron (Database Core)
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x1769d8,
        emissive: 0x155ebd,
        emissiveIntensity: 2.2,
        metalness: 0.8,
        roughness: 0.15,
        wireframe: false,
      })
      const coreMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(1.15, 0), coreMat)
      cluster.add(coreMesh)

      // Core Edges Glow
      const coreEdgeMat = new THREE.LineBasicMaterial({ color: 0x8be8c5, transparent: true, opacity: 0.95 })
      const coreEdges = new THREE.LineSegments(new THREE.EdgesGeometry(coreMesh.geometry), coreEdgeMat)
      coreEdges.scale.setScalar(1.02)
      coreMesh.add(coreEdges)

      // 2. Outer Glass Bounding Box
      const outerGlassMat = new THREE.MeshPhysicalMaterial({
        color: 0x73a8ff,
        metalness: 0.4,
        roughness: 0.1,
        transmission: 0.35,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
      })
      const outerBox = new THREE.Mesh(new THREE.BoxGeometry(3.1, 3.1, 3.1), outerGlassMat)
      cluster.add(outerBox)

      const outerEdgeMat = new THREE.LineBasicMaterial({ color: 0x73a8ff, transparent: true, opacity: 0.65 })
      const outerEdges = new THREE.LineSegments(new THREE.EdgesGeometry(outerBox.geometry), outerEdgeMat)
      outerEdges.scale.setScalar(1.002)
      cluster.add(outerEdges)

      // 3. Orbiting Microservice Satellite Nodes (4 Service Nodes)
      const satelliteGroup = new THREE.Group()
      cluster.add(satelliteGroup)

      const satPositions = [
        { x: 2.2, y: 0.6, z: 0, color: 0x8be8c5, name: 'WebSockets' },
        { x: -2.2, y: -0.6, z: 0.5, color: 0x73a8ff, name: 'REST API' },
        { x: 0, y: 2.0, z: -1.2, color: 0xad94ff, name: 'AWS SQS' },
        { x: 0.8, y: -2.0, z: 1.2, color: 0xffb36b, name: 'PostgreSQL' },
      ]

      const satelliteMeshes: THREE.Mesh[] = []

      satPositions.forEach((pos) => {
        const satMat = new THREE.MeshStandardMaterial({
          color: pos.color,
          emissive: pos.color,
          emissiveIntensity: 1.8,
          metalness: 0.6,
          roughness: 0.2,
        })
        const satMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.32, 0), satMat)
        satMesh.position.set(pos.x, pos.y, pos.z)
        satelliteGroup.add(satMesh)
        satelliteMeshes.push(satMesh)

        // Laser beam lines linking satellite node to central core
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(pos.x, pos.y, pos.z),
        ])
        const lineMat = new THREE.LineDashedMaterial({
          color: pos.color,
          dashSize: 0.2,
          gapSize: 0.1,
          transparent: true,
          opacity: 0.7,
        })
        const laserLine = new THREE.Line(lineGeo, lineMat)
        satelliteGroup.add(laserLine)
      })

      // 4. Cybernetic Concentric Torus Rings
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x8be8c5,
        emissive: 0x35d89b,
        emissiveIntensity: 2.5,
        metalness: 0.5,
        roughness: 0.15,
      })
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.035, 16, 100), ringMat)
      ring1.rotation.x = Math.PI / 2
      cluster.add(ring1)

      const ring2Mat = new THREE.MeshStandardMaterial({
        color: 0xad94ff,
        emissive: 0x8e63ff,
        emissiveIntensity: 2.2,
        metalness: 0.5,
        roughness: 0.15,
      })
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.95, 0.025, 16, 100), ring2Mat)
      ring2.rotation.set(0.65, 0.3, -0.4)
      cluster.add(ring2)

      // 5. Dynamic Interactive Point Lights
      const pointerLight = new THREE.PointLight(0x73a8ff, 10, 8)
      pointerLight.position.set(2, 2, 3)
      scene.add(pointerLight)

      const mintLight = new THREE.PointLight(0x8be8c5, 6, 6)
      mintLight.position.set(-2.5, -1.5, 2)
      scene.add(mintLight)

      const ambientLight = new THREE.AmbientLight(0x8cb6e8, 1.2)
      scene.add(ambientLight)

      // 6. Grid Helper Floor
      const grid = new THREE.GridHelper(8, 16, 0x3b82f6, 0x1e3a8a)
      grid.position.y = -2.15
      if (Array.isArray(grid.material)) {
        grid.material.forEach((mat) => {
          mat.transparent = true
          mat.opacity = 0.3
        })
      } else {
        grid.material.transparent = true
        grid.material.opacity = 0.3
      }
      scene.add(grid)

      // 7. Ambient Particle Cloud (220 particles)
      const particleCount = 220
      const particlePositions = new Float32Array(particleCount * 3)
      for (let i = 0; i < particleCount; i++) {
        const radius = 2.0 + Math.random() * 2.2
        const angle = Math.random() * Math.PI * 2
        particlePositions[i * 3] = Math.cos(angle) * radius
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4.2
        particlePositions[i * 3 + 2] = Math.sin(angle) * radius
      }
      const particleGeo = new THREE.BufferGeometry()
      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
      const particles = new THREE.Points(
        particleGeo,
        new THREE.PointsMaterial({
          color: 0x8be8c5,
          size: 0.03,
          transparent: true,
          opacity: 0.75,
          sizeAttenuation: true,
        }),
      )
      scene.add(particles)

      // Pointer Interactivity & Rotation
      const pointer = new THREE.Vector2()
      const targetRotation = new THREE.Vector2()
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      let animationFrame = 0

      const resize = () => {
        const { width, height } = container.getBoundingClientRect()
        if (!width || !height) return
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height, false)
      }

      const handlePointerMove = (event: PointerEvent) => {
        const bounds = container.getBoundingClientRect()
        pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
        pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
        targetRotation.y = pointer.x * 0.45
        targetRotation.x = pointer.y * 0.3
        pointerLight.position.x = pointer.x * 3.5
        pointerLight.position.y = pointer.y * 2.5
      }

      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(container)
      container.addEventListener('pointermove', handlePointerMove, { passive: true })
      resize()

      const animate = (time: number) => {
        const elapsed = time * 0.001

        if (!reducedMotion) {
          cluster.rotation.y += 0.003
          coreMesh.rotation.x += 0.004
          coreMesh.rotation.z += 0.002
          satelliteGroup.rotation.y = -elapsed * 0.25
          ring2.rotation.z += 0.0025
          particles.rotation.y = elapsed * 0.04
        }

        cluster.rotation.x += (targetRotation.x - cluster.rotation.x) * 0.04
        cluster.rotation.z += (-targetRotation.y * 0.3 - cluster.rotation.z) * 0.04
        ring1.rotation.z += 0.0015

        renderer.render(scene, camera)
        animationFrame = requestAnimationFrame(animate)
      }

      animationFrame = requestAnimationFrame(animate)

      cleanup = () => {
        cancelAnimationFrame(animationFrame)
        resizeObserver.disconnect()
        container.removeEventListener('pointermove', handlePointerMove)
        disposeScene(scene)
        renderer.dispose()
        container.classList.remove('systems-scene--ready')
      }
    }

    void init()
    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return (
    <div ref={sceneRef} className="systems-scene" aria-hidden="true">
      <canvas ref={canvasRef} className="systems-scene__canvas" />
      <img className="systems-scene__fallback" src="/assets/system-core.png" alt="" draggable="false" />
    </div>
  )
}
