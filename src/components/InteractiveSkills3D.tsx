import { useEffect, useRef, useState } from 'react'

interface SkillNode {
  name: string
  category: 'Backend' | 'Languages' | 'Database' | 'Cloud' | 'Real-Time' | 'Frontend'
  level: string
  color: number
  connections: string[]
}

const skillData: SkillNode[] = [
  { name: 'Node.js', category: 'Backend', level: 'Production / High-Scale', color: 0x38bdf8, connections: ['REST APIs', 'WebSockets', 'MongoDB', 'Redis'] },
  { name: 'Go (Golang)', category: 'Backend', level: 'Microservices & Gin APIs', color: 0x34d399, connections: ['PostgreSQL', 'AWS SQS', 'Docker', 'Redis'] },
  { name: 'TypeScript', category: 'Languages', level: 'Strict Typing Architecture', color: 0x38bdf8, connections: ['React 18', 'Node.js', 'Next.js'] },
  { name: 'PostgreSQL', category: 'Database', level: 'Multi-Tenant RBAC & ACID', color: 0xc084fc, connections: ['Go (Golang)', 'Node.js', 'AWS SQS'] },
  { name: 'MongoDB', category: 'Database', level: 'High-Volume Aggregations', color: 0x10b981, connections: ['Node.js', 'Redis'] },
  { name: 'AWS SQS', category: 'Cloud', level: 'Event-Driven Pipelines', color: 0xfbbf24, connections: ['Go (Golang)', 'PostgreSQL'] },
  { name: 'Docker', category: 'Cloud', level: 'Container Orchestration', color: 0x38bdf8, connections: ['Go (Golang)', 'Node.js'] },
  { name: 'WebSockets', category: 'Real-Time', level: 'Sub-100ms Live Sync', color: 0xc084fc, connections: ['Node.js', 'React 18', 'Redis'] },
  { name: 'Python', category: 'Languages', level: 'Automation & Data Tools', color: 0xfbbf24, connections: ['PostgreSQL'] },
  { name: 'Redis', category: 'Database', level: 'In-Memory Cache & Queues', color: 0x10b981, connections: ['Node.js', 'WebSockets', 'MongoDB'] },
  { name: 'React 18', category: 'Frontend', level: 'Interactive HUD & 3D UI', color: 0x34d399, connections: ['Next.js', 'TypeScript', 'WebSockets'] },
  { name: 'Next.js', category: 'Frontend', level: 'SSR & Server Components', color: 0xc084fc, connections: ['React 18', 'TypeScript'] },
]

const categories = ['All', 'Backend', 'Languages', 'Database', 'Cloud', 'Real-Time', 'Frontend'] as const

export function InteractiveSkills3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null)

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

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
      camera.position.set(0, 0, 10.5)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace

      const masterGroup = new THREE.Group()
      scene.add(masterGroup)

      // Outer Rotating Wireframe Hologram Cage
      const gridGeo = new THREE.IcosahedronGeometry(4.1, 2)
      const gridMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.6,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      })
      const outerCage = new THREE.Mesh(gridGeo, gridMat)
      masterGroup.add(outerCage)

      // Concentric Orbital Ring
      const ringGeo = new THREE.TorusGeometry(4.3, 0.02, 16, 100)
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xfbbf24,
        emissiveIntensity: 1.8,
      })
      const ringMesh = new THREE.Mesh(ringGeo, ringMat)
      ringMesh.rotation.x = Math.PI / 3
      masterGroup.add(ringMesh)

      // Create 3D Nodes & Canvas Text Sprites
      const nodeMeshes: InstanceType<typeof THREE.Mesh>[] = []
      const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle

      skillData.forEach((skill, i) => {
        const y = 1 - (i / (skillData.length - 1)) * 2
        const radiusAtY = Math.sqrt(1 - y * y)
        const theta = phi * i

        const radius = 3.5
        const x = Math.cos(theta) * radiusAtY * radius
        const z = Math.sin(theta) * radiusAtY * radius
        const posY = y * radius

        // 3D Hexagonal Prism Geometry
        const gemGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.2, 6)
        const gemMat = new THREE.MeshStandardMaterial({
          color: skill.color,
          emissive: skill.color,
          emissiveIntensity: 2.2,
          metalness: 0.85,
          roughness: 0.15,
        })

        const mesh = new THREE.Mesh(gemGeo, gemMat)
        mesh.position.set(x, posY, z)
        mesh.rotation.x = Math.PI / 4
        mesh.userData = skill
        masterGroup.add(mesh)
        nodeMeshes.push(mesh)

        // 2D Text Sprite for Node Label
        const textCanvas = document.createElement('canvas')
        textCanvas.width = 256
        textCanvas.height = 64
        const ctx = textCanvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = '#f4f6f8'
          ctx.font = 'bold 24px DM Mono, monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(skill.name, 128, 32)
        }
        const textTexture = new THREE.CanvasTexture(textCanvas)
        const spriteMat = new THREE.SpriteMaterial({ map: textTexture, transparent: true })
        const sprite = new THREE.Sprite(spriteMat)
        sprite.position.set(x, posY - 0.55, z)
        sprite.scale.set(1.8, 0.45, 1)
        masterGroup.add(sprite)

        // Laser Energy Conduit to Central Core
        const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, posY, z)]
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
        const lineMat = new THREE.LineBasicMaterial({ color: skill.color, transparent: true, opacity: 0.25 })
        const line = new THREE.Line(lineGeo, lineMat)
        masterGroup.add(line)
      })

      // Central Energy Core
      const coreGeo = new THREE.OctahedronGeometry(0.8, 1)
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 2.8,
      })
      const centerCore = new THREE.Mesh(coreGeo, coreMat)
      masterGroup.add(centerCore)

      // Lights
      const centerLight = new THREE.PointLight(0x38bdf8, 7, 14)
      scene.add(centerLight)

      const ambientLight = new THREE.AmbientLight(0x38bdf8, 1.3)
      scene.add(ambientLight)

      // Raycasting Mouse Hover Detection
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

        outerCage.rotation.y = elapsed * 0.15
        ringMesh.rotation.z = -elapsed * 0.25
        centerCore.rotation.y = elapsed * 0.8

        masterGroup.rotation.y += (targetRotation.y - masterGroup.rotation.y) * 0.04
        masterGroup.rotation.x += (targetRotation.x - masterGroup.rotation.x) * 0.04

        // Raycast logic
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(nodeMeshes)

        let currentHover: SkillNode | null = null

        nodeMeshes.forEach((mesh) => {
          const nodeData = mesh.userData as SkillNode
          const isCategoryMatch = activeCategory === 'All' || nodeData.category === activeCategory
          const isHovered = intersects.length > 0 && intersects[0].object === mesh

          if (isHovered && isCategoryMatch) {
            currentHover = nodeData
          }

          const targetScale = isHovered && isCategoryMatch ? 1.5 : isCategoryMatch ? 1.0 : 0.4
          mesh.scale.setScalar(mesh.scale.x + (targetScale - mesh.scale.x) * 0.1)
          mesh.rotation.y += 0.02
        })

        if (currentHover !== hoveredSkill) {
          setHoveredSkill(currentHover)
        }

        renderer.render(scene, camera)
        animationFrame = requestAnimationFrame(animate)
      }

      animationFrame = requestAnimationFrame(animate)

      cleanup = () => {
        cancelAnimationFrame(animationFrame)
        resizeObserver.disconnect()
        container.removeEventListener('pointermove', handlePointerMove)
        gridGeo.dispose()
        gridMat.dispose()
        renderer.dispose()
      }
    }

    void init()
    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [activeCategory])

  return (
    <div ref={containerRef} className="interactive-skills-3d" aria-label="3D Interactive Neural Skill Matrix">
      <div className="skills-3d-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`skills-3d-filter-btn ${activeCategory === cat ? 'is-active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <canvas ref={canvasRef} className="interactive-skills-3d__canvas" />

      {hoveredSkill ? (
        <div className="skills-3d-hud">
          <span className="skills-3d-hud__cat">3D NEURAL MATRIX // {hoveredSkill.category}</span>
          <strong className="skills-3d-hud__title">{hoveredSkill.name}</strong>
          <span className="skills-3d-hud__level">{hoveredSkill.level}</span>
          {hoveredSkill.connections.length > 0 ? (
            <div className="skills-3d-hud__connections">
              <span>PIPELINE CONNECTIONS:</span>
              <p>{hoveredSkill.name} → {hoveredSkill.connections.join(' → ')}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="skills-3d-caption">
        <span>3D NEURAL SKILL MATRIX</span>
        <span>RAYCASTING HOVER · THREE.JS ENGINE</span>
      </div>
    </div>
  )
}
