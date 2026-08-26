import { useEffect, useRef, useState } from 'react'

interface SkillNode {
  name: string
  category: string
  color: number
}

const heroSkillsData: SkillNode[] = [
  { name: 'Node.js', category: 'Backend', color: 0x38bdf8 },
  { name: 'Go (Golang)', category: 'Backend', color: 0x34d399 },
  { name: 'TypeScript', category: 'Languages', color: 0x38bdf8 },
  { name: 'PostgreSQL', category: 'Database', color: 0xc084fc },
  { name: 'MongoDB', category: 'Database', color: 0x34d399 },
  { name: 'AWS SQS', category: 'Cloud', color: 0x38bdf8 },
  { name: 'Docker', category: 'Cloud', color: 0x38bdf8 },
  { name: 'WebSockets', category: 'Real-Time', color: 0xc084fc },
  { name: 'Python', category: 'Languages', color: 0x38bdf8 },
  { name: 'Redis', category: 'Database', color: 0x34d399 },
  { name: 'React 18', category: 'Frontend', color: 0x34d399 },
  { name: 'Next.js', category: 'Frontend', color: 0xc084fc },
]

export function SystemsScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null)
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
      camera.position.set(0, 0, 8.5)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace

      // Master 3D Skills Globe Group
      const globeGroup = new THREE.Group()
      scene.add(globeGroup)

      // 1. Outer Hologram Wireframe Globe Sphere
      const globeGeo = new THREE.IcosahedronGeometry(2.8, 2)
      const globeMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.7,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })
      const outerGlobe = new THREE.Mesh(globeGeo, globeMat)
      globeGroup.add(outerGlobe)

      // 2. Orbital Rings
      const ring1Geo = new THREE.TorusGeometry(3.2, 0.025, 16, 100)
      const ring1Mat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 2.0,
      })
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
      ring1.rotation.x = Math.PI / 3
      globeGroup.add(ring1)

      const ring2Geo = new THREE.TorusGeometry(3.5, 0.02, 16, 100)
      const ring2Mat = new THREE.MeshStandardMaterial({
        color: 0x34d399,
        emissive: 0x34d399,
        emissiveIntensity: 1.8,
      })
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
      ring2.rotation.y = Math.PI / 4
      globeGroup.add(ring2)

      // 3. Fibonacci 3D Skills Nodes & Floating 3D Text Sprites
      const nodeMeshes: InstanceType<typeof THREE.Mesh>[] = []
      const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle

      heroSkillsData.forEach((skill, i) => {
        const y = 1 - (i / (heroSkillsData.length - 1)) * 2
        const radiusAtY = Math.sqrt(1 - y * y)
        const theta = phi * i

        const radius = 2.8
        const x = Math.cos(theta) * radiusAtY * radius
        const z = Math.sin(theta) * radiusAtY * radius
        const posY = y * radius

        // 3D Hexagonal Node Geometry
        const nodeGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.15, 6)
        const nodeMat = new THREE.MeshStandardMaterial({
          color: skill.color,
          emissive: skill.color,
          emissiveIntensity: 2.5,
          metalness: 0.85,
          roughness: 0.15,
        })

        const mesh = new THREE.Mesh(nodeGeo, nodeMat)
        mesh.position.set(x, posY, z)
        mesh.rotation.x = Math.PI / 4
        mesh.userData = skill
        globeGroup.add(mesh)
        nodeMeshes.push(mesh)

        // 2D Text Canvas Sprite floating next to node
        const textCanvas = document.createElement('canvas')
        textCanvas.width = 256
        textCanvas.height = 64
        const ctx = textCanvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = '#f4f6f8'
          ctx.font = 'bold 22px DM Mono, monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(skill.name, 128, 32)
        }
        const textTexture = new THREE.CanvasTexture(textCanvas)
        const spriteMat = new THREE.SpriteMaterial({ map: textTexture, transparent: true })
        const sprite = new THREE.Sprite(spriteMat)
        sprite.position.set(x, posY - 0.45, z)
        sprite.scale.set(1.5, 0.38, 1)
        globeGroup.add(sprite)

        // Laser Conduits connecting to central core
        const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, posY, z)]
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
        const lineMat = new THREE.LineBasicMaterial({ color: skill.color, transparent: true, opacity: 0.3 })
        const line = new THREE.Line(lineGeo, lineMat)
        globeGroup.add(line)
      })

      // 4. Central Energy Core
      const coreGeo = new THREE.IcosahedronGeometry(0.7, 1)
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

        outerGlobe.rotation.y = elapsed * 0.3
        outerGlobe.rotation.x = Math.sin(elapsed * 0.3) * 0.15
        centerCore.rotation.y = -elapsed * 0.8
        ring1.rotation.z = elapsed * 0.5
        ring2.rotation.z = -elapsed * 0.35

        globeGroup.rotation.y += (targetRotation.y - globeGroup.rotation.y) * 0.05
        globeGroup.rotation.x += (targetRotation.x - globeGroup.rotation.x) * 0.05

        // Raycasting
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(nodeMeshes)

        if (intersects.length > 0) {
          const hovered = intersects[0].object.userData as SkillNode
          if (hovered !== hoveredSkill) setHoveredSkill(hovered)
        } else if (hoveredSkill !== null) {
          setHoveredSkill(null)
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
  }, [hoveredSkill])

  return (
    <div
      ref={containerRef}
      className={`systems-scene ${isThreeReady ? 'systems-scene--ready' : ''}`}
      aria-label="3D Interactive Skills Globe"
    >
      <canvas ref={canvasRef} className="systems-scene__canvas" />

      {/* Dynamic Hover HUD Overlay */}
      <div className="marvel-hero-hud">
        <span className="marvel-hero-hud__tag">3D SKILLS GLOBE // HERO CORE</span>
        <strong className="marvel-hero-hud__title">
          {hoveredSkill ? hoveredSkill.name.toUpperCase() : '3D SKILLS GLOBE'}
        </strong>
        <span className="marvel-hero-hud__detail">
          {hoveredSkill ? `Category: ${hoveredSkill.category} · Hovering Node` : 'All Core Technologies Embedded · Hover over any 3D node'}
        </span>
      </div>
    </div>
  )
}
