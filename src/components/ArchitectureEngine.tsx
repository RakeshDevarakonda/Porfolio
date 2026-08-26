import { useState } from 'react'
import { ArrowRight, Cpu } from 'lucide-react'

interface ArchNode {
  id: string
  label: string
  type: string
  desc: string
  connections: string[]
  color: string
}

const archNodes: ArchNode[] = [
  {
    id: 'react',
    label: 'React / Next.js',
    type: 'Frontend Tier',
    desc: 'Interactive UI, State Management, Server-Side Rendering',
    connections: ['express', 'ws'],
    color: '#38bdf8',
  },
  {
    id: 'express',
    label: 'Node.js / Express',
    type: 'API Gateway',
    desc: 'REST Endpoints, Auth Routing, Middleware',
    connections: ['gin', 'redis', 'mongo'],
    color: '#34d399',
  },
  {
    id: 'gin',
    label: 'Go / Gin Microservices',
    type: 'High-Concurrency Core',
    desc: 'High-Throughput Services & Heavy Computational Tasks',
    connections: ['postgres', 'redis', 'sqs'],
    color: '#38bdf8',
  },
  {
    id: 'ws',
    label: 'WebSocket Engine',
    type: 'Real-Time Pipeline',
    desc: 'Sub-100ms Live Streaming & State Sync',
    connections: ['express', 'redis'],
    color: '#c084fc',
  },
  {
    id: 'redis',
    label: 'Redis Cache & Queue',
    type: 'In-Memory Store',
    desc: 'Pub/Sub Messaging, Session Storage, Rate Limiting',
    connections: ['mongo', 'postgres'],
    color: '#34d399',
  },
  {
    id: 'sqs',
    label: 'AWS SQS & EventBridge',
    type: 'Event-Driven Pipeline',
    desc: 'Asynchronous Job Queue & Serverless Event Bus',
    connections: ['lambda'],
    color: '#38bdf8',
  },
  {
    id: 'lambda',
    label: 'AWS Lambda',
    type: 'Serverless Compute',
    desc: 'Auto-Scaling Async Event Processors',
    connections: ['postgres', 'mongo'],
    color: '#38bdf8',
  },
  {
    id: 'mongo',
    label: 'MongoDB Atlas',
    type: 'Document Store',
    desc: 'Multi-Tenant Workspaces & Aggregations',
    connections: [],
    color: '#34d399',
  },
  {
    id: 'postgres',
    label: 'PostgreSQL Relational DB',
    type: 'ACID Data Core',
    desc: 'Strict Granular RBAC & Relational Schemas',
    connections: [],
    color: '#c084fc',
  },
]

export function ArchitectureEngine() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null)

  const activeNode = archNodes.find((n) => n.id === activeNodeId)

  const isConnected = (id: string) => {
    if (!activeNodeId) return false
    if (activeNodeId === id) return true
    if (activeNode?.connections.includes(id)) return true
    const parent = archNodes.find((n) => n.connections.includes(id))
    return parent?.id === activeNodeId
  }

  return (
    <div className="architecture-engine">
      <div className="architecture-engine__header">
        <div>
          <span className="focus-index">03 / ARCHITECTURE COMMAND CENTER</span>
          <h2>THE ENGINE</h2>
          <p className="architecture-engine__subtitle">Interactive view of how multi-tenant services, event pipelines, and databases connect.</p>
        </div>
        <div className="architecture-engine__status">
          <span className="status-dot" />
          <span>DATA FLOW: OPERATIONAL</span>
        </div>
      </div>

      <div className="architecture-grid">
        {archNodes.map((node) => {
          const highlighted = isConnected(node.id)
          return (
            <div
              key={node.id}
              className={`arch-card ${highlighted ? 'is-highlighted' : ''} ${activeNodeId === node.id ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveNodeId(node.id)}
              onMouseLeave={() => setActiveNodeId(null)}
              style={{ '--node-color': node.color } as React.CSSProperties}
            >
              <div className="arch-card__top">
                <span className="arch-card__type">{node.type}</span>
                <span className="arch-card__indicator" />
              </div>
              <h3 className="arch-card__label">{node.label}</h3>
              <p className="arch-card__desc">{node.desc}</p>
              {node.connections.length > 0 ? (
                <div className="arch-card__targets">
                  <span>Connects to:</span>
                  {node.connections.map((targetId) => {
                    const targetNode = archNodes.find((n) => n.id === targetId)
                    return (
                      <span key={targetId} className="arch-target-pill">
                        {targetNode?.label.split(' ')[0]}
                      </span>
                    )
                  })}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      {activeNode ? (
        <div className="architecture-hud-inspector">
          <div className="arch-hud__header">
            <Cpu size={16} />
            <span>STARK INSPECTOR // {activeNode.type.toUpperCase()}</span>
          </div>
          <div className="arch-hud__body">
            <strong>{activeNode.label}</strong>
            <p>{activeNode.desc}</p>
            {activeNode.connections.length > 0 ? (
              <p className="arch-hud__flow">
                Pipeline Route: <b>{activeNode.label}</b> <ArrowRight size={14} />{' '}
                {activeNode.connections.map((c) => archNodes.find((n) => n.id === c)?.label).join(', ')}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
