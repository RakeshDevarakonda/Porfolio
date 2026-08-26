export type ProjectCategory = 'all' | 'backend' | 'fullstack' | 'devtools' | 'realtime'

export interface Project {
  name: string
  repo: string
  live?: string
  npm?: string
  description: string
  details: string
  technologies: string[]
  accent: 'blue' | 'mint' | 'violet' | 'orange'
  category: ProjectCategory
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: 'Multi-tenant CRM',
    repo: 'https://github.com/RakeshDevarakonda/Multi-tenant-CRM',
    live: 'https://multi-tenant-crm-rosy.vercel.app',
    description: 'Tenant-scoped CRM lead query service built with TypeScript and Express.',
    details: 'A standalone service for querying tenant-scoped CRM leads using the raw pg driver and PostgreSQL, with seeded tenant identities and contract tests.',
    technologies: ['TypeScript', 'Express.js', 'PostgreSQL'],
    accent: 'blue',
    category: 'backend',
    featured: true,
  },
  {
    name: 'Task Management System',
    repo: 'https://github.com/RakeshDevarakonda/TASK-MANAGEMENT-SYSTEM',
    description: 'Multi-workspace collaboration API with hierarchical RBAC and governed task states.',
    details: 'A Go and Gin REST API with PostgreSQL, JWT access tokens, rotating refresh tokens, role-gated task transitions, and rate limiting.',
    technologies: ['Go', 'Gin', 'PostgreSQL', 'JWT', 'sqlx'],
    accent: 'mint',
    category: 'backend',
    featured: true,
  },
  {
    name: 'CMS Platform',
    repo: 'https://github.com/RakeshDevarakonda/CMS-PROJECT',
    live: 'https://cms-project-amber.vercel.app',
    description: 'Modular headless CMS with REST APIs for dynamic content workflows.',
    details: 'A Node.js, Express.js, and MongoDB platform with dynamic content schemas, content authoring, versioning, API-layer RBAC, and indexing strategies.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'REST API'],
    accent: 'violet',
    category: 'fullstack',
    featured: true,
  },
  {
    name: 'Mongo-DataLayer',
    repo: 'https://github.com/RakeshDevarakonda/mongo-datalayer',
    npm: 'https://www.npmjs.com/package/mongo-datalayer',
    description: 'Published MongoDB data abstraction layer designed to remove setup boilerplate.',
    details: 'Provides singleton connection management, full CRUD, cursor-based pagination, query builders, field-level change detection, snapshot restoration, and automated audit logs.',
    technologies: ['Node.js', 'MongoDB', 'npm'],
    accent: 'orange',
    category: 'devtools',
    featured: true,
  },
  {
    name: 'Video Progress Tracker',
    repo: 'https://github.com/RakeshDevarakonda/VideoProgressTracker',
    live: 'https://video-progress-tracker-coral.vercel.app',
    description: 'Stateful video tracking service for accurate watch history and resume playback.',
    details: 'Persists granular watch-history records and merges watched intervals to calculate unique viewing progress across sessions under concurrent load.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'React'],
    accent: 'blue',
    category: 'fullstack',
  },
  {
    name: 'Real-Time Chat Application API',
    repo: 'https://github.com/RakeshDevarakonda/Real-Time-Chat-Application-API',
    live: 'https://real-time-chat-application-api-theta.vercel.app',
    description: 'Real-time messaging API with direct messages, group chats, and Swagger documentation.',
    details: 'A Node.js and Express API with MongoDB, JWT-secured authentication, one-on-one and group messaging flows, and a documented API surface.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Swagger'],
    accent: 'mint',
    category: 'realtime',
  },
]
