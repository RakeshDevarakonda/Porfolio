export type LinkKey = 'github' | 'linkedin' | 'resume' | 'portfolio'

export interface ExperienceItem {
  company: string
  role: string
  period: string
  location?: string
  bullets: string[]
}

export interface EducationItem {
  program: string
  institution: string
  period: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface FocusArea {
  title: string
  description: string
  proof: string[]
  accent: 'blue' | 'mint' | 'violet'
}

export const profile = {
  name: 'Devarakonda Rakesh',
  displayName: 'DEVARAKONDA RAKESH',
  title: 'Full Stack Developer',
  secondaryTitle: 'Backend Developer',
  location: 'Hyderabad, India',
  email: 'rakeshdevarakonda2000@gmail.com',
  summary:
    'Backend-focused Full Stack Developer with hands-on production experience building event-driven, multi-tenant systems on the MERN stack, Node.js, and Go.',
  about: [
    'I build backend-heavy products where security, real-time behavior, and operational clarity matter. My work spans RBAC-driven access control, strict tenant isolation, serverless data pipelines, WebSocket infrastructure, and AWS.',
    'Alongside professional systems work, I publish independent developer tools — including an open-source MongoDB data abstraction layer — and build practical full-stack products to explore better ways of designing, shipping, and operating software.',
  ],
  links: {
    github: 'https://github.com/RakeshDevarakonda',
    linkedin: 'https://www.linkedin.com/in/rakeshdevarakonda',
    resume: '/Rakesh_Devarakonda_Full_Stack_Developer.pdf',
    portfolio: 'https://porfolio-six-teal.vercel.app/',
  } satisfies Record<LinkKey, string>,
  stats: {
    githubRepos: '24',
    workspaces: '10+',
    npmDownloads: '1,000+',
  },
} as const

export const skillGroups: SkillGroup[] = [
  { label: 'Languages', items: ['JavaScript', 'Python', 'Go', 'TypeScript'] },
  { label: 'Frontend', items: ['React.js', 'Next.js', 'Redux', 'React Query', 'HTML5', 'CSS3', 'Bootstrap'] },
  { label: 'Backend', items: ['Node.js', 'Express.js', 'Go (Gin)', 'REST API', 'WebSockets'] },
  { label: 'Databases', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'] },
  { label: 'Cloud & DevOps', items: ['AWS', 'Docker', 'GitHub Actions', 'CI/CD'] },
  { label: 'Testing & Tools', items: ['Jest', 'Supertest', 'Postman', 'Git', 'GitHub'] },
]

export const focusAreas: FocusArea[] = [
  {
    title: 'Multi-tenant systems',
    description: 'Secure collaboration across workspaces with granular RBAC and strict tenant data isolation.',
    proof: ['RBAC', 'Tenant isolation', '10+ workspaces'],
    accent: 'blue',
  },
  {
    title: 'Event-driven infrastructure',
    description: 'Serverless data pipelines built with AWS SQS, Lambda, and EventBridge for better throughput and lower overhead.',
    proof: ['SQS', 'Lambda', 'EventBridge'],
    accent: 'mint',
  },
  {
    title: 'Real-time products',
    description: 'WebSocket infrastructure for speech-to-text streaming, browser sync, and collaborative product experiences.',
    proof: ['WebSockets', 'Sub-100ms', 'Live sync'],
    accent: 'violet',
  },
]

export const experienceHighlights = [
  { value: '~80%', label: 'throughput increase' },
  { value: '~40%', label: 'less infrastructure overhead' },
  { value: '<100ms', label: 'speech-to-text latency' },
  { value: '20%', label: 'fewer redundant API calls' },
]

export const experience: ExperienceItem[] = [
  {
    company: 'Narrative Intelligence Private Limited',
    role: 'Backend Developer',
    period: 'Sep 2025 – Present',
    location: 'Hyderabad, India',
    bullets: [
      'Architected a multi-workspace backend with granular Role-Based Access Control (RBAC) and strict tenant data isolation across 10+ workspaces.',
      'Engineered serverless, event-driven data pipelines using AWS SQS, Lambda, and EventBridge, increasing throughput by ~80% and cutting infrastructure overhead by ~40%.',
      'Built backend microservices in Go (Gin) alongside the core Node.js/Express stack for workloads suited to a compiled, concurrent runtime.',
      'Implemented OAuth 2.0 flows for Gmail, Google Calendar, Microsoft Outlook, Slack, and Notion to support third-party data synchronization.',
      'Deployed WebSocket-based speech-to-text streaming with sub-100ms latency for live collaboration features.',
      'Built a browser sync engine, a full-stack email inbox application, and a secure password manager backend with encrypted credential storage.',
      'Optimized React.js application performance through lazy loading, code splitting, and CDN delivery, reducing redundant API calls by 20%.',
    ],
  },
]

export const education: EducationItem[] = [
  { program: 'B.Tech, Electrical & Electronics Engineering (EEE)', institution: 'Vageswari College of Engineering', period: '2018 – 2022' },
  { program: 'Intermediate (12th)', institution: 'Sri Kakathiya Junior College', period: '2016 – 2018' },
  { program: 'Secondary School (10th)', institution: 'Ushodaya High School', period: '2016' },
]

export const achievements = [
  {
    title: 'Mongo-DataLayer published on npm',
    detail: 'A zero-boilerplate MongoDB data abstraction layer with singleton connection management, CRUD, cursor-based pagination, query builders, and audit capabilities.',
    metric: '1,000+ downloads',
    link: 'https://www.npmjs.com/package/mongo-datalayer',
  },
  {
    title: 'Open source portfolio',
    detail: 'Maintains a public GitHub profile with practical backend, full-stack, real-time, and developer-tool projects.',
    metric: '24 public repositories',
    link: 'https://github.com/RakeshDevarakonda',
  },
]
