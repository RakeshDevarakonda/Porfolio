import { FormEvent, useEffect, useState } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleDot,
  Cloud,
  Code2,
  Copy,
  Database,
  ExternalLink,
  FileText,
  GitBranch,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Menu,
  PackageOpen,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  TestTube2,
  Trophy,
  X,
  Zap,
} from 'lucide-react'
import { About3DViewer } from './components/About3DViewer'
import { ArchitectureEngine } from './components/ArchitectureEngine'
import { GithubIcon, LinkedinIcon } from './components/BrandIcons'
import { CursorFollower } from './components/CursorFollower'
import { Full3DWorld } from './components/Full3DWorld'
import { InteractiveTerminal } from './components/InteractiveTerminal'
import { Preloader3D } from './components/Preloader3D'
import { Reveal } from './components/Reveal'
import { SectionHeading } from './components/SectionHeading'
import { SystemsScene } from './components/SystemsScene'
import { TiltCard3D } from './components/TiltCard3D'
import { ToastContainer, ToastMessage } from './components/Toast'
import { Typewriter } from './components/Typewriter'
import { WhatILikeBuilding } from './components/WhatILikeBuilding'
import { achievements, education, experience, experienceHighlights, focusAreas, profile } from './data/profile'
import { ProjectCategory, projects } from './data/projects'

const navItems = [
  ['HOME', 'top'],
  ['ABOUT', 'about'],
  ['EXPERIENCE', 'experience'],
  ['ARCHITECTURE', 'architecture'],
  ['PROJECTS', 'projects'],
  ['OPEN SOURCE', 'opensource'],
  ['CONTACT', 'contact'],
] as const

const projectCategoryTabs: { label: string; value: ProjectCategory }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Backend & APIs', value: 'backend' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'DevTools / NPM', value: 'devtools' },
  { label: 'Real-Time', value: 'realtime' },
]

const focusIcons = [ShieldCheck, Zap, Activity]

const aboutPillars = [
  {
    icon: ShieldCheck,
    title: 'Multi-Tenant RBAC & Security',
    desc: 'Architecting strict tenant data isolation and granular access boundaries across 10+ active workspaces.',
    accent: 'blue',
  },
  {
    icon: Zap,
    title: 'AWS Event-Driven Pipelines',
    desc: 'Designing serverless SQS, Lambda, and EventBridge data streams increasing throughput by ~80%.',
    accent: 'mint',
  },
  {
    icon: Activity,
    title: 'Real-Time Streaming Systems',
    desc: 'Building WebSocket infrastructure for sub-100ms speech-to-text streaming and live browser state sync.',
    accent: 'violet',
  },
  {
    icon: PackageOpen,
    title: 'Developer Tooling & NPM',
    desc: 'Publishing zero-boilerplate open-source abstraction packages like mongo-datalayer (1,000+ downloads).',
    accent: 'orange',
  },
]

function App() {
  const [loading, setLoading] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all')
  const [activeSection, setActiveSection] = useState<string>('top')
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  useEffect(() => {
    document.documentElement.dataset.theme = 'dark'
  }, [])

  // Scrollspy & Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0)
      setShowBackToTop(currentScroll > 400)

      const sections = navItems.map(([, id]) => document.getElementById(id)).filter(Boolean)
      const scrollPosition = currentScroll + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          return
        }
      }
      setActiveSection('top')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  const addToast = (title: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email).then(() => {
      addToast('Email copied to clipboard!', 'success')
    })
  }

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '')
    const email = String(form.get('email') ?? '')
    const message = String(form.get('message') ?? '')
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
    addToast('Opening your email client...', 'info')
    event.currentTarget.reset()
  }

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedCategory)

  return (
    <div className="site-shell">
      {/* 3D Preloader Screen Loader */}
      {loading ? <Preloader3D onComplete={() => setLoading(false)} /> : null}

      {/* Full 3D Background World */}
      <Full3DWorld />
      <CursorFollower />
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Reading Progress Line */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="brand-mark">RD</span>
          <span>COMMAND CENTER</span>
        </a>

        <nav className={`main-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? 'is-active' : ''}
              onClick={() => closeMobile()}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="status-badge" style={{ margin: 0 }}>
            <span className="status-dot" />
            <span>SYSTEM ONLINE</span>
          </div>
          <button
            className="menu-toggle"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-grid" aria-labelledby="hero-title">
          <div className="hero-copy">
            <Reveal>
              <div className="status-badge">
                <span className="status-dot" />
                <span>SYSTEM ONLINE // ARCHITECTURE STACK OPERATIONAL</span>
              </div>

              <h1 id="hero-title">
                <span>DEVARAKONDA RAKESH</span>
              </h1>

              <p className="hero-title">
                <Typewriter
                  words={['Full Stack Developer | Backend Engineer', 'Go & Node.js Architect', 'Event-Driven Infrastructure', 'Open Source Creator']}
                />
              </p>

              <h2 className="hero-central-motto">I build systems that scale.</h2>

              <p className="hero-summary">
                Event-driven backends. Real-time infrastructure. Cloud-native systems. Comfortable across RBAC-driven security design, sub-100ms WebSocket streaming, and AWS cloud pipelines.
              </p>

              <div className="hero-boot-string">
                <code>&gt; initializing developer_profile... &gt; loading backend_modules... &gt; connecting cloud_infrastructure... &gt; system.status = operational</code>
              </div>

              <div className="hero-actions">
                <a
                  className="button button--primary"
                  href="#projects"
                >
                  <Sparkles size={16} /> ENTER THE SYSTEM <ArrowUpRight size={15} />
                </a>
                <a
                  className="button button--ghost"
                  href="#experience"
                >
                  <BriefcaseBusiness size={15} /> VIEW MY WORK
                </a>
                <a
                  className="button"
                  href={profile.links.resume}
                  download
                >
                  <FileText size={15} /> RESUME PDF
                </a>
              </div>

              <div className="hero-proof" aria-label="Selected verified highlights">
                <div>
                  <strong>{profile.stats.workspaces}</strong>
                  <span>workspaces supported</span>
                </div>
                <div>
                  <strong>{profile.stats.npmDownloads}</strong>
                  <span>npm downloads</span>
                </div>
                <div>
                  <strong>{profile.stats.githubRepos}</strong>
                  <span>public repositories</span>
                </div>
              </div>

              <a className="scroll-cue" href="#about">
                <span>Scroll to enter system</span>
                <ArrowDown size={15} />
              </a>
            </Reveal>
          </div>

          <Reveal className="hero-visual" delay={100}>
            <div className="hero-grid-glow" aria-hidden="true" />
            <SystemsScene />
            <div className="hero-visual-caption">
              <span>INTERACTIVE 3D SKILLS CORE</span>
              <span>THREE.JS ENGINE</span>
            </div>
          </Reveal>
        </section>

        <section className="focus-section section--bordered" aria-labelledby="focus-title">
          <div className="focus-shell">
            <Reveal className="focus-intro">
              <div>
                <span className="focus-index">00 / ENGINEERING FOCUS</span>
                <h2 id="focus-title">The work is in the system.</h2>
              </div>
              <p>My strongest work sits where product behavior meets backend architecture: secure boundaries, dependable pipelines, and real-time feedback.</p>
            </Reveal>
            <div className="focus-grid">
              {focusAreas.map((area, index) => {
                const Icon = focusIcons[index]
                return (
                  <Reveal className="focus-card-wrapper" delay={index * 70} key={area.title}>
                    <TiltCard3D className={`focus-card focus-card--${area.accent}`}>
                      <div className="focus-card__top">
                        <Icon size={19} />
                        <span>0{index + 1}</span>
                      </div>
                      <h3>{area.title}</h3>
                      <p>{area.description}</p>
                      <div className="focus-card__proof">
                        {area.proof.map((proof, proofIndex) => (
                          <span key={proof}>
                            <b>{proofIndex === area.proof.length - 1 ? '→' : '·'}</b>
                            {proof}
                          </span>
                        ))}
                      </div>
                    </TiltCard3D>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section id="about" className="section section--bordered" aria-labelledby="about-title">
          <div className="content-grid content-grid--about-upgraded">
            <Reveal>
              <SectionHeading index="01" title="THE ENGINEER BEHIND THE SYSTEM" description="Not just writing code. Designing systems." />
            </Reveal>

            <div className="about-main-layout">
              {/* User Professional Portrait Photo Card */}
              <Reveal className="about-3d-box" delay={50}>
                <About3DViewer />
              </Reveal>

              <Reveal className="about-copy-upgraded" delay={90}>
                <p className="lead">
                  Rakesh is a backend-focused Full Stack Developer with production experience building event-driven, multi-tenant systems using Node.js, Go, and React.
                </p>
                {profile.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Reveal>
            </div>

            {/* Core Engineering Profile Stats Card */}
            <Reveal className="profile-stats-card-wrapper" delay={140}>
              <TiltCard3D className="profile-stats-card">
                <div className="profile-stat-cell"><span>ROLE</span><strong>Backend / Full Stack Developer</strong></div>
                <div className="profile-stat-cell"><span>LOCATION</span><strong>Hyderabad, India</strong></div>
                <div className="profile-stat-cell"><span>CORE</span><strong>Node.js + Go</strong></div>
                <div className="profile-stat-cell"><span>FRONTEND</span><strong>React / Next.js</strong></div>
                <div className="profile-stat-cell"><span>CLOUD</span><strong>AWS</strong></div>
                <div className="profile-stat-cell"><span>SPECIALIZATION</span><strong>Real-Time & Distributed Systems</strong></div>
              </TiltCard3D>
            </Reveal>

            {/* Core Engineering Pillars */}
            <div className="about-pillars-grid">
              {aboutPillars.map((pillar, idx) => {
                const Icon = pillar.icon
                return (
                  <Reveal className="about-pillar-wrapper" delay={180 + idx * 50} key={pillar.title}>
                    <TiltCard3D className={`about-pillar-card about-pillar-card--${pillar.accent}`}>
                      <div className="about-pillar-icon"><Icon size={20} /></div>
                      <h3>{pillar.title}</h3>
                      <p>{pillar.desc}</p>
                    </TiltCard3D>
                  </Reveal>
                )
              })}
            </div>

            {/* Executable ZSH Interactive Terminal */}
            <Reveal className="terminal-section-wrapper" delay={240}>
              <TiltCard3D className="terminal-card">
                <InteractiveTerminal />
              </TiltCard3D>
            </Reveal>
          </div>
        </section>

        <section id="experience" className="section section--bordered" aria-labelledby="experience-title">
          <div className="content-grid content-grid--experience">
            <Reveal>
              <SectionHeading index="02" title="MISSION CONTROL" description="Production systems I've worked on at Narrative Intelligence Private Limited." />
            </Reveal>
            <div className="experience-stack">
              <Reveal className="impact-grid" delay={70}>
                {experienceHighlights.map((highlight) => (
                  <div className="impact-item" key={highlight.label}>
                    <strong>{highlight.value}</strong>
                    <span>{highlight.label}</span>
                  </div>
                ))}
              </Reveal>
              <div className="experience-list">
                {experience.map((item) => (
                  <Reveal className="experience-item" key={`${item.company}-${item.role}`}>
                    <div className="experience-marker"><span /><span /></div>
                    <div className="experience-meta">
                      <span>{item.period}</span>
                      <span>{item.location}</span>
                    </div>
                    <div className="experience-content">
                      <div className="experience-title">
                        <div>
                          <h3>{item.role}</h3>
                          <p>{item.company}</p>
                        </div>
                        <BriefcaseBusiness size={20} />
                      </div>
                      <ul>
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Architecture - The Engine */}
        <section id="architecture" className="section section--bordered">
          <Reveal>
            <ArchitectureEngine />
          </Reveal>
        </section>

        <section id="projects" className="section section--bordered" aria-labelledby="projects-title">
          <div className="content-grid content-grid--projects">
            <Reveal>
              <SectionHeading index="04" title="PROJECT ARMORY" description="Systems I've built outside the mission." />
            </Reveal>
            <div className="project-showcase">

              {/* Category Filter Pills */}
              <Reveal className="project-filter-bar">
                {projectCategoryTabs.map((tab) => (
                  <button
                    key={tab.value}
                    className={`project-filter-btn ${selectedCategory === tab.value ? 'is-active' : ''}`}
                    onClick={() => setSelectedCategory(tab.value)}
                  >
                    {tab.label}
                  </button>
                ))}
              </Reveal>

              {filteredProjects.length === 0 ? (
                <div className="no-projects">No projects found in this category.</div>
              ) : (
                <div className="project-grid">
                  {filteredProjects.map((project, index) => (
                    <Reveal className="project-card-wrapper" delay={index * 45} key={project.name}>
                      <TiltCard3D className={`project-card project-card--${project.accent}`}>
                        <div className="project-card__meta">
                          <span>0{index + 1}</span>
                          <span>{project.npm ? 'npm + repo' : project.live ? 'repo + live' : 'repository'}</span>
                        </div>
                        <div className="project-heading">
                          <h3>{project.name}</h3>
                          {project.featured ? <span className="project-featured">Featured · 1,000+ Downloads</span> : null}
                        </div>
                        <p>{project.description}</p>
                        <p className="project-card__details">{project.details}</p>

                        <div className="project-card__bottom">
                          <div className="project-tech">
                            {project.technologies.map((technology) => (
                              <span key={technology}>{technology}</span>
                            ))}
                          </div>
                          <div className="project-links">
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`View ${project.name} source on GitHub`}
                            >
                              <GithubIcon width={15} height={15} />
                            </a>
                            {project.live ? (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Open ${project.name} live demo`}
                              >
                                <ExternalLink size={15} />
                              </a>
                            ) : null}
                            {project.npm ? (
                              <a
                                href={project.npm}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Open ${project.name} on npm`}
                              >
                                <PackageOpen size={15} />
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </TiltCard3D>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 19: What I Like Building */}
        <section className="section section--bordered">
          <Reveal>
            <WhatILikeBuilding />
          </Reveal>
        </section>

        <section id="opensource" className="section section--bordered" aria-labelledby="opensource-title">
          <div className="content-grid content-grid--opensource">
            <Reveal>
              <SectionHeading index="05" title="OPEN SOURCE PROTOCOL" description="Built not only to solve my own problems, but to make other developers' lives easier." />
            </Reveal>
            <Reveal className="github-panel-wrapper" delay={100}>
              <TiltCard3D className="github-panel">
                <div className="github-panel__copy">
                  <div className="github-panel__icon"><GithubIcon width={22} height={22} /></div>
                  <div>
                    <h3>Mongo-DataLayer — 1,000+ Downloads</h3>
                    <p>A zero-boilerplate MongoDB data abstraction layer with singleton connections, CRUD, cursor pagination, and audit log tracking.</p>
                  </div>
                  <a
                    className="text-link"
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open GitHub <ArrowUpRight size={15} />
                  </a>
                </div>
                <div className="github-stats">
                  <div><strong>{profile.stats.githubRepos}</strong><span>public repositories</span></div>
                  <div><strong>{profile.stats.npmDownloads}</strong><span>npm downloads</span></div>
                  <div><strong>1</strong><span>package published</span></div>
                </div>
              </TiltCard3D>
            </Reveal>
            <Reveal className="opensource-rail" delay={180}>
              <div className="rail-item">
                <GitBranch size={16} />
                <span>Build</span><ChevronRight size={14} /><span>Document</span><ChevronRight size={14} /><span>Share</span>
              </div>
              <div className="rail-item rail-item--muted">
                <Activity size={16} />
                <span>Multi-tenant backends</span><span>·</span><span>Real-time APIs</span><span>·</span><span>Developer tooling</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="education" className="section section--bordered" aria-labelledby="education-title">
          <div className="two-column-section">
            <Reveal className="subsection">
              <SectionHeading index="06" title="Education" />
              <div className="education-list">
                {education.map((item) => (
                  <div className="education-item" key={item.program}>
                    <GraduationCap size={20} />
                    <div>
                      <h3>{item.program}</h3>
                      <p>{item.institution}</p>
                      <span>{item.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="subsection subsection--achievements" delay={100}>
              <SectionHeading index="07" title="Achievements" />
              <div className="achievement-list">
                {achievements.map((item) => (
                  <a
                    className="achievement-item"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    key={item.title}
                  >
                    <div className="achievement-icon"><Trophy size={18} /></div>
                    <div>
                      <div className="achievement-item__heading">
                        <h3>{item.title}</h3>
                        <span>{item.metric}</span>
                      </div>
                      <p>{item.detail}</p>
                    </div>
                    <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
              <p className="honesty-note">
                <CircleDot size={14} /> Verified public repositories & published npm packages.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="section section--contact section--bordered" aria-labelledby="contact-title">
          <div className="content-grid content-grid--contact">
            <Reveal>
              <SectionHeading index="08" title="BUILD SOMETHING WORTH SCALING" description="Have a difficult backend problem, a product idea, or a system that needs to scale? Send a note." />
            </Reveal>
            <Reveal className="contact-layout" delay={100}>
              <div className="contact-details">
                <button
                  className="contact-copy-card"
                  onClick={handleCopyEmail}
                >
                  <Mail size={17} />
                  <span>{profile.email}</span>
                  <Copy size={15} />
                </button>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedinIcon width={17} height={17} />
                  <span>linkedin.com/in/rakeshdevarakonda</span>
                  <ArrowUpRight size={15} />
                </a>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon width={17} height={17} />
                  <span>github.com/RakeshDevarakonda</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <label>
                    <span>Name</span>
                    <input required name="name" type="text" autoComplete="name" placeholder="Your name" />
                  </label>
                  <label>
                    <span>Email</span>
                    <input required name="email" type="email" autoComplete="email" placeholder="you@example.com" />
                  </label>
                </div>
                <label>
                  <span>Message</span>
                  <textarea required name="message" rows={4} placeholder="Tell me a little about what you’re building…" />
                </label>
                <div className="form-footer">
                  <span>
                    {submitted ? <><Check size={15} /> Your email client is ready.</> : 'This opens your default email client with your message.'}
                  </span>
                  <button
                    className="button button--primary"
                    type="submit"
                  >
                    <Send size={15} /> LET'S BUILD IT
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>DEVARAKONDA RAKESH</strong>
          <span style={{ display: 'block', fontSize: '0.62rem', color: 'var(--text-muted)' }}>Full Stack Developer | Backend Engineer</span>
        </div>
        <span>system.status = operational</span>
        <div className="footer-links">
          <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
        <span>© 2026 Rakesh Devarakonda</span>
      </footer>

      {/* Floating Back to Top Button */}
      <button
        className={`back-to-top ${showBackToTop ? 'is-visible' : ''}`}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        aria-label="Scroll back to top"
      >
        <ArrowUp size={18} />
      </button>

      <div className="page-corner page-corner--left" aria-hidden="true">&gt;_</div>
      <div className="page-corner page-corner--right" aria-hidden="true">••••</div>
    </div>
  )
}

export default App
