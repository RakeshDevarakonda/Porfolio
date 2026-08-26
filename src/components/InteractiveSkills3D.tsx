import { useEffect, useRef, useState } from 'react'
import type * as THREE from 'three'
import { soundFx } from './SoundEffects'

interface SkillNode {
  name: string
  category: 'Backend' | 'Languages' | 'Database' | 'Cloud' | 'Frontend' | 'Real-Time'
  level: string
  color: number
}

const skillsList: SkillNode[] = [
  { name: 'Go', category: 'Backend', level: 'Production / Gin', color: 0x8be8c5 },
  { name: 'Node.js', category: 'Backend', level: 'Production / Event-Driven', color: 0x73a8ff },
  { name: 'Python', category: 'Languages', level: 'Data & Scripting', color: 0xffb36b },
  { name: 'TypeScript', category: 'Languages', level: 'Full Stack Type Safety', color: 0x73a8ff },
  { name: 'MongoDB', category: 'Database', level: 'Mongo-DataLayer Creator', color: 0x8be8c5 },
  { name: 'PostgreSQL', category: 'Database', level: 'Raw PG / RBAC Queries', color: 0xad94ff },
  { name: 'AWS', category: 'Cloud', level: 'SQS / Lambda / EventBridge', color: 0xffb36b },
  { name: 'Docker', category: 'Cloud', level: 'Containerization & CI/CD', color: 0x73a8ff },
  { name: 'WebSockets', category: 'Real-Time', level: 'Sub-100ms Streaming', color: 0xad94ff },
  { name: 'React.js', category: 'Frontend', level: 'Hooks / State / Performance', color: 0x8be8c5 },
  { name: 'Redis', category: 'Database', level: 'Caching & Session Store', color: 0xffb36b },
  { name: 'Express.js', category: 'Backend', level: 'REST Microservices', color: 0x73a8ff },
]

const categories = ['All', 'Backend', 'Languages', 'Database', 'Cloud', 'Real-Time'] as const

export function InteractiveSkills3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null)

  const activeCategoryRef = useRef(activeCategory)
  useEffect(() => {
    activeCategoryRef.current = activeCategory
  }, [activeCategory])

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

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
      camera.position.z = 9.0

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace

      const group = new THREE.Group()
      scene.add(group)

      // Create Text Sprite Generator
      const createTextSprite = (text: string, colorHex: string) => {
        const textCanvas = document.createElement('canvas')
        textCanvas.width = 256
        textCanvas.height = 64
        const ctx = textCanvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = 'rgba(10, 16, 26, 0.85)'
          ctx.strokeStyle = colorHex
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.roundRect(4, 4, 248, 56, 12)
          ctx.fill()
          ctx.stroke()

          ctx.font = 'bold 24px "DM Mono", monospace'
          ctx.fillStyle = '#ffffff'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(text, 128, 32)
        }
        const texture = new THREE.CanvasTexture(textCanvas)
        const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.9 })
        const sprite = new THREE.Sprite(spriteMat)
        sprite.scale.set(1.6, 0.4, 1)
        return sprite
      }

      // Distribute Skill Nodes along 3D Fibonacci Sphere
      const nodeObjects: {
        mesh: THREE.Mesh
        sprite: THREE.Sprite
        data: SkillNode
        initialPos: THREE.Vector3
      }[] = []

      const radius = 3.4
      const total = skillsList.length

      skillsList.forEach((skill, i) => {
        const phi = Math.acos(-1 + (2 * i) / total)
        const theta = Math.sqrt(total * Math.PI) * phi

        const x = radius * Math.cos(theta) * Math.sin(phi)
        const y = radius * Math.sin(theta) * Math.sin(phi)
        const z = radius * Math.cos(phi)

        // 3D Hexagonal Prism Geometry
        const geometry = new THREE.CylinderGeometry(0.38, 0.38, 0.25, 6)
        const material = new THREE.MeshStandardMaterial({
          color: skill.color,
          emissive: skill.color,
          emissiveIntensity: 1.6,
          metalness: 0.8,
          roughness: 0.15,
        })

        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)
        mesh.rotation.x = Math.PI / 4

        // Wireframe Glow Ring
        const wireMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 })
        const wire = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), wireMat)
        wire.scale.setScalar(1.08)
        mesh.add(wire)

        // 3D Sprite Label
        const colorHex = '#' + skill.color.toString(16).padStart(6, '0')
        const sprite = createTextSprite(skill.name, colorHex)
        sprite.position.set(x * 1.28, y * 1.28, z * 1.28)

        group.add(mesh)
        group.add(sprite)

        nodeObjects.push({
          mesh,
          sprite,
          data: skill,
          initialPos: new THREE.Vector3(x, y, z),
        })
      })

      // 3D Connection Lines & Flow Particles
      const linePositions: number[] = []
      const connectionPairs: { a: THREE.Vector3; b: THREE.Vector3 }[] = []

      for (let i = 0; i < total; i++) {
        for (let j = i + 1; j < total; j++) {
          const dist = nodeObjects[i].initialPos.distanceTo(nodeObjects[j].initialPos)
          if (dist < 3.4) {
            const a = nodeObjects[i].initialPos
            const b = nodeObjects[j].initialPos
            linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z)
            connectionPairs.push({ a, b })
          }
        }
      }

      const lineGeo = new THREE.BufferGeometry()
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
      const lineMat = new THREE.LineBasicMaterial({ color: 0x73a8ff, transparent: true, opacity: 0.4 })
      const networkLines = new THREE.LineSegments(lineGeo, lineMat)
      group.add(networkLines)

      // Lighting
      const pLight = new THREE.PointLight(0x8be8c5, 8, 12)
      pLight.position.set(4, 4, 6)
      scene.add(pLight)

      const aLight = new THREE.AmbientLight(0x73a8ff, 1.4)
      scene.add(aLight)

      // Raycaster for Hover Interaction
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

      const handlePointerMove = (event: PointerEvent) => {
        const bounds = container.getBoundingClientRect()
        const px = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
        const py = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
        mouse.x = px
        mouse.y = py
        targetRotation.y = px * 0.9
        targetRotation.x = py * 0.6
      }

      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(container)
      container.addEventListener('pointermove', handlePointerMove, { passive: true })
      resize()

      let animationFrame = 0
      const animate = (time: number) => {
        const elapsed = time * 0.001

        group.rotation.y += 0.003
        group.rotation.x = Math.sin(elapsed * 0.3) * 0.12

        group.rotation.y += (targetRotation.y - group.rotation.y) * 0.04
        group.rotation.x += (targetRotation.x - group.rotation.x) * 0.04

        // Raycasting check
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(nodeObjects.map((n) => n.mesh))

        let foundHover: SkillNode | null = null

        nodeObjects.forEach((node, idx) => {
          const isCategoryMatch =
            activeCategoryRef.current === 'All' || node.data.category === activeCategoryRef.current

          const isHovered = intersects.length > 0 && intersects[0].object === node.mesh

          if (isHovered) {
            foundHover = node.data
          }

          const scale = isHovered ? 1.45 : isCategoryMatch ? 1 + Math.sin(elapsed * 2 + idx) * 0.08 : 0.65
          node.mesh.scale.setScalar(scale)

          const opacity = isCategoryMatch ? (isHovered ? 1.0 : 0.85) : 0.25
          node.sprite.material.opacity = opacity

          node.mesh.rotation.y += 0.015
        })

        if (foundHover !== hoveredSkill) {
          setHoveredSkill(foundHover)
        }

        renderer.render(scene, camera)
        animationFrame = requestAnimationFrame(animate)
      }

      animationFrame = requestAnimationFrame(animate)

      cleanup = () => {
        cancelAnimationFrame(animationFrame)
        resizeObserver.disconnect()
        container.removeEventListener('pointermove', handlePointerMove)
        lineGeo.dispose()
        lineMat.dispose()
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
    <div ref={containerRef} className="interactive-skills-3d" aria-label="Interactive 3D Skill Graph Matrix">
      {/* Category Filter Pills on Top of 3D Graph */}
      <div className="skills-3d-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`skills-3d-filter-btn ${activeCategory === cat ? 'is-active' : ''}`}
            onClick={() => {
              soundFx.playClick()
              setActiveCategory(cat)
            }}
            onMouseEnter={() => soundFx.playHover()}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="interactive-skills-3d__canvas" />

      {/* Interactive HUD Hover Tooltip Card */}
      {hoveredSkill ? (
        <div className="skills-3d-hud">
          <span className="skills-3d-hud__cat">{hoveredSkill.category}</span>
          <strong className="skills-3d-hud__title">{hoveredSkill.name}</strong>
          <span className="skills-3d-hud__level">{hoveredSkill.level}</span>
        </div>
      ) : null}

      <div className="skills-3d-caption">
        <span>INTERACTIVE 3D FIBONACCI GRAPH SPHERE</span>
        <span>HOVER / CLICK NODES TO EXPLORE STACK</span>
      </div>
    </div>
  )
}
