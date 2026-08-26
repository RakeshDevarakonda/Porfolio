import { useEffect, useRef, useState } from 'react'

interface SkillItem {
  name: string
  category: string
  level: string
  color: number
  colorHex: string
}

const heroSkillsList: SkillItem[] = [
  { name: 'Node.js', category: 'Backend', level: 'Production / High-Scale', color: 0x38bdf8, colorHex: '#38bdf8' },
  { name: 'Go (Golang)', category: 'Backend', level: 'High-Concurrency Core', color: 0x34d399, colorHex: '#34d399' },
  { name: 'TypeScript', category: 'Languages', level: 'Strict Type Systems', color: 0x38bdf8, colorHex: '#38bdf8' },
  { name: 'PostgreSQL', category: 'Database', level: 'ACID & Relational Schemas', color: 0xc084fc, colorHex: '#c084fc' },
  { name: 'MongoDB', category: 'Database', level: 'Multi-Tenant Data Layer', color: 0x34d399, colorHex: '#34d399' },
  { name: 'AWS SQS & Lambda', category: 'Cloud', level: 'Event-Driven Serverless', color: 0x38bdf8, colorHex: '#38bdf8' },
  { name: 'Docker', category: 'Cloud', level: 'Containerization & Deploy', color: 0x38bdf8, colorHex: '#38bdf8' },
  { name: 'WebSockets', category: 'Real-Time', level: 'Sub-100ms Live Sync', color: 0xc084fc, colorHex: '#c084fc' },
  { name: 'Python', category: 'Languages', level: 'Scripting & Automation', color: 0x38bdf8, colorHex: '#38bdf8' },
  { name: 'Redis', category: 'Database', level: 'In-Memory Cache & PubSub', color: 0x34d399, colorHex: '#34d399' },
  { name: 'React 18', category: 'Frontend', level: 'Modern Concurrent UI', color: 0x34d399, colorHex: '#34d399' },
  { name: 'Next.js', category: 'Frontend', level: 'SSR & App Router', color: 0xc084fc, colorHex: '#c084fc' },
]

export function SystemsScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(heroSkillsList[0])
  const selectedSkillRef = useRef<SkillItem>(heroSkillsList[0])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    selectedSkillRef.current = selectedSkill
  }, [selectedSkill])

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
      camera.position.set(0, 0, 8.2)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace

      // Master 3D Skills Vault Group
      const vaultGroup = new THREE.Group()
      scene.add(vaultGroup)

      // 1. Sleek Cyber Globe Sphere
      const globeGeo = new THREE.IcosahedronGeometry(2.7, 2)
      const globeMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.5,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      })
      const outerGlobe = new THREE.Mesh(globeGeo, globeMat)
      vaultGroup.add(outerGlobe)

      // 2. Fibonacci Placement for 12 Skill Nodes + 3D Text Canvas Sprites
      const nodeMeshes: InstanceType<typeof THREE.Mesh>[] = []
      const phi = Math.PI * (3 - Math.sqrt(5))

      heroSkillsList.forEach((skill, i) => {
        const y = 1 - (i / (heroSkillsList.length - 1)) * 2
        const radiusAtY = Math.sqrt(1 - y * y)
        const theta = phi * i

        const radius = 2.7
        const x = Math.cos(theta) * radiusAtY * radius
        const z = Math.sin(theta) * radiusAtY * radius
        const posY = y * radius

        // 3D Hexagonal Node Mesh
        const nodeGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.14, 6)
        const nodeMat = new THREE.MeshStandardMaterial({
          color: skill.color,
          emissive: skill.color,
          emissiveIntensity: 2.6,
          metalness: 0.85,
          roughness: 0.15,
        })

        const mesh = new THREE.Mesh(nodeGeo, nodeMat)
        mesh.position.set(x, posY, z)
        mesh.rotation.x = Math.PI / 4
        mesh.userData = skill
        vaultGroup.add(mesh)
        nodeMeshes.push(mesh)

        // 2D Text Canvas Sprite floating near node
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
        sprite.position.set(x, posY - 0.42, z)
        sprite.scale.set(1.4, 0.35, 1)
        vaultGroup.add(sprite)

        // Laser Conduits connecting to central core
        const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, posY, z)]
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
        const lineMat = new THREE.LineBasicMaterial({ color: skill.color, transparent: true, opacity: 0.35 })
        const line = new THREE.Line(lineGeo, lineMat)
        vaultGroup.add(line)
      })

      // 3. Central Core
      const coreGeo = new THREE.IcosahedronGeometry(0.75, 1)
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 2.8,
      })
      const centerCore = new THREE.Mesh(coreGeo, coreMat)
      vaultGroup.add(centerCore)

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

        vaultGroup.rotation.y += (targetRotation.y - vaultGroup.rotation.y) * 0.05
        vaultGroup.rotation.x += (targetRotation.x - vaultGroup.rotation.x) * 0.05

        // Raycasting logic
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(nodeMeshes)

        let hovered: SkillItem | null = null

        nodeMeshes.forEach((mesh) => {
          const item = mesh.userData as SkillItem
          const isHovered = intersects.length > 0 && intersects[0].object === mesh

          if (isHovered) hovered = item

          const activeName = (selectedSkillRef.current as SkillItem)?.name || ''
          const isSelected = activeName === item.name
          const targetScale = isHovered || isSelected ? 1.45 : 1.0
          mesh.scale.setScalar(mesh.scale.x + (targetScale - mesh.scale.x) * 0.1)
          mesh.rotation.y += 0.02
        })

        if (hovered) {
          const activeName = (selectedSkillRef.current as SkillItem)?.name || ''
          if ((hovered as SkillItem).name !== activeName) {
            setSelectedSkill(hovered)
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
        globeGeo.dispose()
        globeMat.dispose()
        coreGeo.dispose()
        coreMat.dispose()
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
      aria-label="3D Interactive Tech Skills Globe Core"
    >
      <canvas ref={canvasRef} className="systems-scene__canvas" />

      {/* Floating Active Skill Badge Overlay */}
      {selectedSkill ? (
        <div className="skills-3d-hud" style={{ top: 'auto', bottom: '0.8rem', right: '0.8rem' }}>
          <span className="skills-3d-hud__cat">{selectedSkill.category}</span>
          <strong className="skills-3d-hud__title">{selectedSkill.name}</strong>
          <span className="skills-3d-hud__level">{selectedSkill.level}</span>
        </div>
      ) : null}
    </div>
  )
}
