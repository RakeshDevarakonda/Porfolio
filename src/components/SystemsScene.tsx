import { useEffect, useRef, useState } from 'react'

interface SkillNode {
  name: string
  category: string
  level: string
  color: number
  pos: [number, number, number]
}

const matrixSkills: SkillNode[] = [
  { name: 'Node.js', category: 'Backend Tier', level: 'Production REST & Auth APIs', color: 0x38bdf8, pos: [-2.2, 1.6, 0.5] },
  { name: 'Go (Golang)', category: 'High-Concurrency Core', level: 'Gin Microservices & Pipelines', color: 0x34d399, pos: [2.2, 1.6, 0.5] },
  { name: 'TypeScript', category: 'Language Tier', level: 'Strict Enterprise Schemas', color: 0x38bdf8, pos: [-3.0, 0.1, 0.2] },
  { name: 'PostgreSQL', category: 'Relational DB', level: 'ACID & Multi-Tenant RBAC', color: 0xc084fc, pos: [3.0, 0.1, 0.2] },
  { name: 'MongoDB', category: 'Document Store', level: 'Workspace Query Abstraction', color: 0x34d399, pos: [-2.2, -1.5, 0.5] },
  { name: 'AWS Cloud', category: 'Cloud Pipeline', level: 'SQS Queues & Lambda Triggers', color: 0x38bdf8, pos: [2.2, -1.5, 0.5] },
  { name: 'Docker', category: 'DevOps', level: 'Container Orchestration', color: 0x38bdf8, pos: [0, 2.5, -0.8] },
  { name: 'WebSockets', category: 'Real-Time Tier', level: 'Sub-100ms Streaming & Sync', color: 0xc084fc, pos: [0, -2.5, -0.8] },
  { name: 'Python', category: 'Scripting', level: 'Automation & Data Pipelines', color: 0x38bdf8, pos: [-1.2, 0.8, -1.2] },
  { name: 'Redis', category: 'In-Memory Cache', level: 'Pub/Sub & Session Storage', color: 0x34d399, pos: [1.2, 0.8, -1.2] },
  { name: 'React 18', category: 'Frontend UI', level: 'Concurrent Mode Components', color: 0x34d399, pos: [-1.2, -0.8, -1.2] },
  { name: 'Next.js', category: 'Full Stack UI', level: 'App Router & Server Actions', color: 0xc084fc, pos: [1.2, -0.8, -1.2] },
]

export function SystemsScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeSkill, setActiveSkill] = useState<SkillNode>(matrixSkills[0])
  const activeSkillRef = useRef<SkillNode>(matrixSkills[0])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    activeSkillRef.current = activeSkill
  }, [activeSkill])

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
      camera.position.set(0, 0, 8.5)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace

      // Master 3D Matrix Group
      const matrixGroup = new THREE.Group()
      scene.add(matrixGroup)

      // 1. Central Core Reactor
      const coreGeo = new THREE.OctahedronGeometry(0.95, 1)
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 2.8,
        wireframe: false,
      })
      const centerCore = new THREE.Mesh(coreGeo, coreMat)
      matrixGroup.add(centerCore)

      // Outer Core Cage
      const cageGeo = new THREE.IcosahedronGeometry(1.4, 1)
      const cageMat = new THREE.MeshStandardMaterial({
        color: 0x34d399,
        emissive: 0x34d399,
        emissiveIntensity: 1.2,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      })
      const cageMesh = new THREE.Mesh(cageGeo, cageMat)
      matrixGroup.add(cageMesh)

      // 2. Build 3D Skill Nodes & Floating 3D Text Labels
      const nodeMeshes: InstanceType<typeof THREE.Mesh>[] = []

      matrixSkills.forEach((skill) => {
        // Hexagonal Prism Node Geometry
        const nodeGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.16, 6)
        const nodeMat = new THREE.MeshStandardMaterial({
          color: skill.color,
          emissive: skill.color,
          emissiveIntensity: 2.5,
          metalness: 0.9,
          roughness: 0.1,
        })

        const mesh = new THREE.Mesh(nodeGeo, nodeMat)
        mesh.position.set(...skill.pos)
        mesh.rotation.x = Math.PI / 4
        mesh.userData = skill
        matrixGroup.add(mesh)
        nodeMeshes.push(mesh)

        // Floating 2D Canvas Text Sprite
        const textCanvas = document.createElement('canvas')
        textCanvas.width = 256
        textCanvas.height = 64
        const ctx = textCanvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 22px DM Mono, monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(skill.name, 128, 32)
        }
        const textTexture = new THREE.CanvasTexture(textCanvas)
        const spriteMat = new THREE.SpriteMaterial({ map: textTexture, transparent: true })
        const sprite = new THREE.Sprite(spriteMat)
        sprite.position.set(skill.pos[0], skill.pos[1] - 0.45, skill.pos[2])
        sprite.scale.set(1.5, 0.38, 1)
        matrixGroup.add(sprite)

        // Laser Beams to Core
        const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...skill.pos)]
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
        const lineMat = new THREE.LineBasicMaterial({ color: skill.color, transparent: true, opacity: 0.35 })
        const line = new THREE.Line(lineGeo, lineMat)
        matrixGroup.add(line)
      })

      // Lights
      const pointLight = new THREE.PointLight(0x38bdf8, 8, 15)
      pointLight.position.set(0, 0, 5)
      scene.add(pointLight)

      const ambientLight = new THREE.AmbientLight(0x38bdf8, 1.4)
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

        // Core Rotations & Pulse
        centerCore.rotation.y = -elapsed * 0.9
        centerCore.rotation.x = Math.sin(elapsed * 0.5) * 0.3
        cageMesh.rotation.y = elapsed * 0.5
        cageMesh.rotation.z = Math.cos(elapsed * 0.4) * 0.2

        matrixGroup.rotation.y += (targetRotation.y - matrixGroup.rotation.y) * 0.05
        matrixGroup.rotation.x += (targetRotation.x - matrixGroup.rotation.x) * 0.05

        // Raycasting Logic
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(nodeMeshes)

        let hovered: SkillNode | null = null

        nodeMeshes.forEach((mesh, index) => {
          const skill = mesh.userData as SkillNode
          const isHovered = intersects.length > 0 && intersects[0].object === mesh

          if (isHovered) hovered = skill

          const currentActive = (activeSkillRef.current as SkillNode)?.name || ''
          const isSelected = currentActive === skill.name

          // Hover elevation & scale
          const targetScale = isHovered || isSelected ? 1.5 : 1.0
          mesh.scale.setScalar(mesh.scale.x + (targetScale - mesh.scale.x) * 0.1)

          // Subtle float animation
          const floatOffsetY = Math.sin(elapsed * 2 + index) * 0.08
          mesh.position.y = skill.pos[1] + floatOffsetY
          mesh.rotation.y += 0.02
        })

        if (hovered) {
          const currentActive = (activeSkillRef.current as SkillNode)?.name || ''
          if ((hovered as SkillNode).name !== currentActive) {
            setActiveSkill(hovered)
          }
        }

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
      className={`systems-scene ${isReady ? 'systems-scene--ready' : ''}`}
      aria-label="3D Interactive Tech Skills Core Matrix"
    >
      <canvas ref={canvasRef} className="systems-scene__canvas" />

      {/* Floating Active Skill Badge Overlay */}
      {activeSkill ? (
        <div className="skills-3d-hud" style={{ top: 'auto', bottom: '0.8rem', right: '0.8rem' }}>
          <span className="skills-3d-hud__cat">{activeSkill.category}</span>
          <strong className="skills-3d-hud__title">{activeSkill.name}</strong>
          <span className="skills-3d-hud__level">{activeSkill.level}</span>
        </div>
      ) : null}
    </div>
  )
}
