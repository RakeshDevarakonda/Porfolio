import { Activity, Cloud, Database, Lock, Server, Zap } from 'lucide-react'
import { TiltCard3D } from './TiltCard3D'

interface BuildingCard {
  title: string
  desc: string
  icon: any
  route: string
  accent: 'blue' | 'orange' | 'mint' | 'violet'
}

const buildingCards: BuildingCard[] = [
  {
    title: 'REAL-TIME SYSTEMS',
    desc: 'Sub-100ms WebSocket infrastructure for live state sync, browser history engine, and audio streaming.',
    icon: Activity,
    route: 'WebSocket → Streaming → Live Data',
    accent: 'blue',
  },
  {
    title: 'EVENT-DRIVEN ARCHITECTURE',
    desc: 'Serverless AWS SQS queues, Lambda triggers, and EventBridge buses yielding 80%+ system throughput gains.',
    icon: Zap,
    route: 'Event → Queue → Lambda → Database',
    accent: 'orange',
  },
  {
    title: 'MULTI-TENANT PLATFORMS',
    desc: 'Strict workspace data isolation, granular RBAC access controls, and multi-tenant DB query scoping.',
    accent: 'mint',
    icon: Lock,
    route: 'User Token → Workspace Isolation → DB Query Scoping',
  },
  {
    title: 'BACKEND APIs & MICROSERVICES',
    desc: 'High-throughput Go (Gin) & Node.js (Express) microservices communicating via clean REST & RPC contracts.',
    icon: Server,
    route: 'Gateway → Service Auth → Microservice Routing',
    accent: 'violet',
  },
  {
    title: 'CLOUD INFRASTRUCTURE',
    desc: 'AWS Cloud Native systems, Docker containerization, CI/CD pipelines, and automated server deployments.',
    icon: Cloud,
    route: 'Code Push → GitHub Actions → Docker Container → AWS',
    accent: 'blue',
  },
  {
    title: 'DATA SYSTEMS & ABSTRACTION',
    desc: 'Custom MongoDB data abstraction layers, PostgreSQL ACID transactions, and Redis in-memory caching.',
    icon: Database,
    route: 'Query Builder → Redis Cache → DB Execution → Audit Log',
    accent: 'orange',
  },
]

export function WhatILikeBuilding() {
  return (
    <div className="what-i-like-building">
      <div className="section-heading">
        <span className="section-index">06</span>
        <div>
          <h2>WHAT I LIKE BUILDING</h2>
          <p>The engineering domains and architectural patterns I enjoy untangling most in production.</p>
        </div>
      </div>

      <div className="building-cards-grid">
        {buildingCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <TiltCard3D key={card.title} className={`building-card building-card--${card.accent}`}>
              <div className="building-card__top">
                <div className="building-card__icon"><Icon size={20} /></div>
                <span className="building-card__number">0{idx + 1}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <div className="building-card__route">
                <span>FLOW:</span> {card.route}
              </div>
            </TiltCard3D>
          )
        })}
      </div>
    </div>
  )
}
