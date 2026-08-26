import { useEffect, useRef, useState } from 'react'

interface SkillNode {
  name: string
  category: string
  level: string
  color: number
  colorHex: string
  iconSymbol: string
  pos: [number, number, number]
}

const heroCoreSkills: SkillNode[] = [
  { name: 'Node.js', category: 'Backend Tier', level: 'Production REST & Auth APIs', color: 0x38bdf8, colorHex: '#38bdf8', iconSymbol: '⬢', pos: [-2.4, 1.7, 0.4] },
  { name: 'Go (Golang)', category: 'High-Concurrency Core', level: 'Gin Microservices & Pipelines', color: 0x34d399, colorHex: '#34d399', iconSymbol: '🦫', pos: [2.4, 1.7, 0.4] },
  { name: 'TypeScript', category: 'Language Tier', level: 'Strict Enterprise Schemas', color: 0x38bdf8, colorHex: '#38bdf8', iconSymbol: 'TS', pos: [-3.2, 0.1, 0.2] },
  { name: 'PostgreSQL', category: 'Relational DB', level: 'ACID & Multi-Tenant RBAC', color: 0xc084fc, colorHex: '#c084fc', iconSymbol: '🐘', pos: [3.2, 0.1, 0.2] },
  { name: 'MongoDB', category: 'Document Store', level: 'Workspace Query Abstraction', color: 0x34d399, colorHex: '#34d399', iconSymbol: '🍃', pos: [-2.4, -1.6, 0.4] },
  { name: 'AWS Cloud', category: 'Cloud Pipeline', level: 'SQS Queues & Lambda Triggers', color: 0x38bdf8, colorHex: '#38bdf8', iconSymbol: '☁', pos: [2.4, -1.6, 0.4] },
  { name: 'Docker', category: 'DevOps', level: 'Container Orchestration', color: 0x38bdf8, colorHex: '#38bdf8', iconSymbol: '🐳', pos: [0, 2.6, -0.6] },
  { name: 'WebSockets', category: 'Real-Time Tier', level: 'Sub-100ms Streaming & Sync', color: 0xc084fc, colorHex: '#c084fc', iconSymbol: '⚡', pos: [0, -2.6, -0.6] },
  { name: 'Python', category: 'Scripting', level: 'Automation & Data Pipelines', color: 0x38bdf8, colorHex: '#38bdf8', iconSymbol: '🐍', pos: [-1.4, 0.9, -1.2] },
  { name: 'Redis', category: 'In-Memory Cache', level: 'Pub/Sub & Session Storage', color: 0x34d399, colorHex: '#34d399', iconSymbol: '🔴', pos: [1.4, 0.9, -1.2] },
  { name: 'React 18', category: 'Frontend UI', level: 'Concurrent Mode Components', color: 0x34d399, colorHex: '#34d399', iconSymbol: '⚛', pos: [-1.4, -0.9, -1.2] },
  { name: 'Next.js', category: 'Full Stack UI', level: 'App Router & Server Actions', color: 0xc084fc, colorHex: '#c084fc', iconSymbol: '▲', pos: [1.4, -0.9, -1.2] },
]

export function SystemsScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeSkill, setActiveSkill] = useState<SkillNode>(heroCoreSkills[0])
  const activeSkillRef = useRef<SkillNode>(heroCoreSkills[0])
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
      camera.position.set(0, 0, 8.6)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace

      // Master 3D Tech Core Group
      const coreGroup = new THREE.Group()
      scene.add(coreGroup)

      // 1. Central Core Reactor Sphere
      const coreGeo = new THREE.OctahedronGeometry(0.9, 1)
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 2.8,
      })
      const centerCore = new THREE.Mesh(coreGeo, coreMat)
      coreGroup.add(centerCore)

      // Wireframe Outer Reactor Cage
      const cageGeo = new THREE.IcosahedronGeometry(1.45, 1)
      const cageMat = new THREE.MeshStandardMaterial({
        color: 0x34d399,
        emissive: 0x34d399,
        emissiveIntensity: 1.2,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      })
      const cageMesh = new THREE.Mesh(cageGeo, cageMat)
      coreGroup.add(cageMesh)

      // 2. Build Floating 3D Logo Sprites
      const spriteNodes: InstanceType<typeof THREE.Sprite>[] = []

      heroCoreSkills.forEach((skill) => {
        // Glassmorphic 3D Logo Canvas Badge
        const textCanvas = document.createElement('canvas')
        textCanvas.width = 320
        textCanvas.height = 76
        const ctx = textCanvas.getContext('2d')
        if (ctx) {
          // Draw dark glass rounded background badge
          ctx.fillStyle = 'rgba(8, 14, 24, 0.92)'
          ctx.strokeStyle = skill.colorHex
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.roundRect(10, 10, 300, 56, 10)
          ctx.fill()
          ctx.stroke()

          // Draw Logo Icon Symbol + Text Label
          ctx.fillStyle = skill.colorHex
          ctx.font = 'bold 22px DM Mono, monospace'
          ctx.textAlign = 'left'
          ctx.textBaseline = 'middle'
          ctx.fillText(skill.iconSymbol, 26, 38)

          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 19px DM Mono, monospace'
          ctx.fillText(skill.name, 68, 38)
        }

        const textTexture = new THREE.CanvasTexture(textCanvas)
        const spriteMat = new THREE.SpriteMaterial({ map: textTexture, transparent: true })
        const sprite = new THREE.Sprite(spriteMat)
        sprite.position.set(...skill.pos)
        sprite.scale.set(1.9, 0.46, 1)
        sprite.userData = skill
        coreGroup.add(sprite)
        spriteNodes.push(sprite)

        // Laser Conduit Beam to Reactor Core
        const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...skill.pos)]
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
        const lineMat = new THREE.LineBasicMaterial({ color: skill.color, transparent: true, opacity: 0.38 })
        const line = new THREE.Line(lineGeo, lineMat)
        coreGroup.add(line)
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

        // Reactor Core Rotations
        centerCore.rotation.y = -elapsed * 0.9
        centerCore.rotation.x = Math.sin(elapsed * 0.5) * 0.3
        cageMesh.rotation.y = elapsed * 0.5
        cageMesh.rotation.z = Math.cos(elapsed * 0.4) * 0.2

        coreGroup.rotation.y += (targetRotation.y - coreGroup.rotation.y) * 0.05
        coreGroup.rotation.x += (targetRotation.x - coreGroup.rotation.x) * 0.05

        // Raycasting Logic directly on 3D Logo Sprites
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(spriteNodes)

        let hovered: SkillNode | null = null

        spriteNodes.forEach((sprite, index) => {
          const skill = sprite.userData as SkillNode
          const isHovered = intersects.length > 0 && intersects[0].object === sprite

          if (isHovered) hovered = skill

          const activeName = (activeSkillRef.current as SkillNode)?.name || ''
          const isSelected = activeName === skill.name

          const targetScaleX = isHovered || isSelected ? 2.3 : 1.9
          const targetScaleY = isHovered || isSelected ? 0.56 : 0.46
          sprite.scale.x += (targetScaleX - sprite.scale.x) * 0.1
          sprite.scale.y += (targetScaleY - sprite.scale.y) * 0.1

          // Floating animation
          const floatOffset = Math.sin(elapsed * 2 + index) * 0.06
          sprite.position.y = skill.pos[1] + floatOffset
        })

        if (hovered) {
          const activeName = (activeSkillRef.current as SkillNode)?.name || ''
          if ((hovered as SkillNode).name !== activeName) {
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
      aria-label="3D Cybernetic Tech Core Matrix"
    >
      <canvas ref={canvasRef} className="systems-scene__canvas" />

      {/* Floating Active Skill Badge Overlay */}
      {activeSkill ? (
        <div className="skills-3d-hud" style={{ top: 'auto', bottom: '0.8rem', right: '0.8rem' }}>
          <span className="skills-3d-hud__cat">{activeSkill.category}</span>
          <strong className="skills-3d-hud__title">{activeSkill.iconSymbol} {activeSkill.name}</strong>
          <span className="skills-3d-hud__level">{activeSkill.level}</span>
        </div>
      ) : null}
    </div>
  )
}
