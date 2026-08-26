import { useEffect, useRef, useState } from 'react'

interface SkillNode {
  name: string
  category: string
  level: string
  color: number
  colorHex: string
  iconSymbol: string
  angle: number
  heightY: number
}

const helixSkills: SkillNode[] = [
  { name: 'Node.js', category: 'Backend Tier', level: 'Production REST & Auth APIs', color: 0x38bdf8, colorHex: '#38bdf8', iconSymbol: '⬢', angle: 0, heightY: 2.2 },
  { name: 'Go (Golang)', category: 'High-Concurrency Core', level: 'Gin Microservices & Pipelines', color: 0x34d399, colorHex: '#34d399', iconSymbol: '🦫', angle: (Math.PI / 3) * 1, heightY: 1.8 },
  { name: 'TypeScript', category: 'Language Tier', level: 'Strict Enterprise Schemas', color: 0x38bdf8, colorHex: '#38bdf8', iconSymbol: 'TS', angle: (Math.PI / 3) * 2, heightY: 1.4 },
  { name: 'PostgreSQL', category: 'Relational DB', level: 'ACID & Multi-Tenant RBAC', color: 0xc084fc, colorHex: '#c084fc', iconSymbol: '🐘', angle: (Math.PI / 3) * 3, heightY: 0.9 },
  { name: 'MongoDB', category: 'Document Store', level: 'Workspace Query Abstraction', color: 0x34d399, colorHex: '#34d399', iconSymbol: '🍃', angle: (Math.PI / 3) * 4, heightY: 0.4 },
  { name: 'AWS Cloud', category: 'Cloud Pipeline', level: 'SQS Queues & Lambda Triggers', color: 0x38bdf8, colorHex: '#38bdf8', iconSymbol: '☁', angle: (Math.PI / 3) * 5, heightY: -0.1 },
  { name: 'Docker', category: 'DevOps', level: 'Container Orchestration', color: 0x38bdf8, colorHex: '#38bdf8', iconSymbol: '🐳', angle: (Math.PI / 3) * 6, heightY: -0.6 },
  { name: 'WebSockets', category: 'Real-Time Tier', level: 'Sub-100ms Streaming & Sync', color: 0xc084fc, colorHex: '#c084fc', iconSymbol: '⚡', angle: (Math.PI / 3) * 7, heightY: -1.1 },
  { name: 'Python', category: 'Scripting', level: 'Automation & Data Pipelines', color: 0x38bdf8, colorHex: '#38bdf8', iconSymbol: '🐍', angle: (Math.PI / 3) * 8, heightY: -1.6 },
  { name: 'Redis', category: 'In-Memory Cache', level: 'Pub/Sub & Session Storage', color: 0x34d399, colorHex: '#34d399', iconSymbol: '🔴', angle: (Math.PI / 3) * 9, heightY: -2.0 },
  { name: 'React 18', category: 'Frontend UI', level: 'Concurrent Mode Components', color: 0x34d399, colorHex: '#34d399', iconSymbol: '⚛', angle: (Math.PI / 3) * 10, heightY: -2.3 },
  { name: 'Next.js', category: 'Full Stack UI', level: 'App Router & Server Actions', color: 0xc084fc, colorHex: '#c084fc', iconSymbol: '▲', angle: (Math.PI / 3) * 11, heightY: -2.6 },
]

export function SystemsScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeSkill, setActiveSkill] = useState<SkillNode>(helixSkills[0])
  const activeSkillRef = useRef<SkillNode>(helixSkills[0])
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

      // Master 3D Double Helix Group
      const helixGroup = new THREE.Group()
      scene.add(helixGroup)

      // 1. Central Core Reactor Pillar
      const coreGeo = new THREE.CylinderGeometry(0.5, 0.5, 5.2, 16)
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 1.4,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })
      const centerPillar = new THREE.Mesh(coreGeo, coreMat)
      helixGroup.add(centerPillar)

      // Inner Core Reactor Sphere
      const innerCoreGeo = new THREE.IcosahedronGeometry(0.85, 1)
      const innerCoreMat = new THREE.MeshStandardMaterial({
        color: 0x34d399,
        emissive: 0x34d399,
        emissiveIntensity: 2.8,
      })
      const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat)
      helixGroup.add(innerCore)

      // 2. Build 3D Helix Portals & Borderless Logo Sprites
      const nodeMeshes: InstanceType<typeof THREE.Mesh>[] = []
      const radius = 2.8

      helixSkills.forEach((skill) => {
        const x = Math.cos(skill.angle) * radius
        const z = Math.sin(skill.angle) * radius

        // Octahedron Portal Crystal Geometry
        const portalGeo = new THREE.OctahedronGeometry(0.34, 0)
        const portalMat = new THREE.MeshStandardMaterial({
          color: skill.color,
          emissive: skill.color,
          emissiveIntensity: 2.6,
          metalness: 0.9,
          roughness: 0.1,
        })

        const mesh = new THREE.Mesh(portalGeo, portalMat)
        mesh.position.set(x, skill.heightY, z)
        mesh.userData = skill
        helixGroup.add(mesh)
        nodeMeshes.push(mesh)

        // Clean Borderless 3D Logo Canvas Sprite
        const textCanvas = document.createElement('canvas')
        textCanvas.width = 280
        textCanvas.height = 60
        const ctx = textCanvas.getContext('2d')
        if (ctx) {
          // Pure transparent background without square borders
          ctx.fillStyle = skill.colorHex
          ctx.font = 'bold 22px DM Mono, monospace'
          ctx.textAlign = 'left'
          ctx.textBaseline = 'middle'
          ctx.fillText(skill.iconSymbol, 10, 30)

          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 19px DM Mono, monospace'
          ctx.fillText(skill.name, 48, 30)
        }
        const textTexture = new THREE.CanvasTexture(textCanvas)
        const spriteMat = new THREE.SpriteMaterial({ map: textTexture, transparent: true })
        const sprite = new THREE.Sprite(spriteMat)
        sprite.position.set(x, skill.heightY - 0.45, z)
        sprite.scale.set(1.5, 0.38, 1)
        helixGroup.add(sprite)

        // Laser Conduit Beam to Pillar
        const points = [new THREE.Vector3(0, skill.heightY, 0), new THREE.Vector3(x, skill.heightY, z)]
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
        const lineMat = new THREE.LineBasicMaterial({ color: skill.color, transparent: true, opacity: 0.4 })
        const line = new THREE.Line(lineGeo, lineMat)
        helixGroup.add(line)
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

        // Pillar & Core Rotations
        centerPillar.rotation.y = elapsed * 0.4
        innerCore.rotation.y = -elapsed * 0.9
        innerCore.rotation.x = Math.sin(elapsed * 0.5) * 0.3

        // Helix Rotation
        helixGroup.rotation.y = elapsed * 0.25

        helixGroup.rotation.y += (targetRotation.y - helixGroup.rotation.y) * 0.05
        helixGroup.rotation.x += (targetRotation.x - helixGroup.rotation.x) * 0.05

        // Raycasting Logic
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(nodeMeshes)

        let hovered: SkillNode | null = null

        nodeMeshes.forEach((mesh) => {
          const skill = mesh.userData as SkillNode
          const isHovered = intersects.length > 0 && intersects[0].object === mesh

          if (isHovered) hovered = skill

          const activeName = (activeSkillRef.current as SkillNode)?.name || ''
          const isSelected = activeName === skill.name

          const targetScale = isHovered || isSelected ? 1.55 : 1.0
          mesh.scale.setScalar(mesh.scale.x + (targetScale - mesh.scale.x) * 0.1)
          mesh.rotation.y += 0.03
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
        innerCoreGeo.dispose()
        innerCoreMat.dispose()
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
      aria-label="3D Cybernetic Skill Double-Helix Core"
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
