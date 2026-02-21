export const AGENT_GROUPS = {
  MASTERS: "Masters",
  ARCHITECTS: "Architects",
  GUARDS: "Guards",
  SPECIALISTS: "Specialists",
};

export const agents = [
  // --- Masters ---
  {
    id: "orchestrator",
    name: "Orchestrator",
    group: AGENT_GROUPS.MASTERS,
    tagline: "Multi-agent coordination",
    description:
      "The default commander. Classifies requests and recruits the right specialists. Never assumes—always clarifies.",
    skills: ["parallel-agents", "behavioral-modes", "plan-writing", "brainstorming", "architecture"],
    triggers: ["coordinate", "all layers", "full stack", "complex task"],
  },
  {
    id: "project-planner",
    name: "Project Planner",
    group: AGENT_GROUPS.MASTERS,
    tagline: "Discovery & task breakdown",
    description:
      "Expert in breaking large goals into actionable plans. Creates PLAN.md files, dependency graphs, and task maps before any code is written.",
    skills: ["brainstorming", "plan-writing", "architecture"],
    triggers: ["plan", "roadmap", "breakdown", "milestones", "estimate"],
  },
  {
    id: "product-owner",
    name: "Product Owner",
    group: AGENT_GROUPS.MASTERS,
    tagline: "Strategy, backlog & MVP focus",
    description:
      "Focuses on business value and 'The Why.' Refines backlog, defines MVP scope, and challenges unnecessary complexity.",
    skills: ["plan-writing", "brainstorming"],
    triggers: ["mvp", "backlog", "user story", "priority", "business value"],
  },
  {
    id: "ai-specialist",
    name: "AI Specialist",
    group: AGENT_GROUPS.MASTERS,
    tagline: "LLM & RAG Architect",
    description:
      "Expert in RAG pipelines, foundation model selection, and token economics. Protects against prompt injection.",
    skills: ["ai-expert", "brainstorming"],
    triggers: ["ai", "llm", "rag", "embeddings", "vector db", "prompt"],
  },
  {
    id: "product-manager",
    name: "Product Manager",
    group: AGENT_GROUPS.MASTERS,
    tagline: "Requirements & user stories",
    description:
      "Bridges the gap between user stories and technical implementation. Writes requirements and acceptance criteria.",
    skills: ["plan-writing", "brainstorming"],
    triggers: ["requirements", "acceptance criteria", "feature spec", "prd"],
  },
  // --- Architects ---
  {
    id: "frontend-specialist",
    name: "Frontend Specialist",
    group: AGENT_GROUPS.ARCHITECTS,
    tagline: "Web UI/UX & React systems",
    description:
      "The design master. Applies the Purple Ban, Deep Design Thinking, and Layout Diversification Mandate to create memorable, non-clichéd interfaces.",
    skills: ["frontend-design", "clean-code", "web-design-guidelines", "tailwind-patterns", "lint-and-validate"],
    triggers: ["component", "react", "ui", "ux", "css", "tailwind", "responsive"],
  },
  {
    id: "backend-specialist",
    name: "Backend Specialist",
    group: AGENT_GROUPS.ARCHITECTS,
    tagline: "API, business logic & performance",
    description:
      "Expert in API design, server logic, performance, and security. Builds robust Express/FastAPI systems with clean separation of concerns.",
    skills: ["api-patterns", "nodejs-best-practices", "database-design"],
    triggers: ["api", "endpoint", "server", "express", "node", "fastapi"],
  },
  {
    id: "database-architect",
    name: "Database Architect",
    group: AGENT_GROUPS.ARCHITECTS,
    tagline: "Schema design & SQL optimization",
    description:
      "Specializes in relational schemas, indexing, migrations, and ORM selection. Every query is measured before optimization.",
    skills: ["database-design"],
    triggers: ["schema", "database", "sql", "migration", "prisma", "index"],
  },
  {
    id: "mobile-developer",
    name: "Mobile Developer",
    group: AGENT_GROUPS.ARCHITECTS,
    tagline: "iOS, Android & React Native",
    description:
      "Dedicated strictly to mobile targets. Knows the rules of thumb for React Native vs. Flutter and never bleeds into web components.",
    skills: ["mobile-design"],
    triggers: ["mobile", "react native", "flutter", "ios", "android", "expo"],
  },
  {
    id: "devops-engineer",
    name: "DevOps Engineer",
    group: AGENT_GROUPS.ARCHITECTS,
    tagline: "CI/CD, Docker & infrastructure",
    description:
      "Manages CI/CD pipelines, Docker containers, PM2 processes, and cloud deployments. Infrastructure-as-code advocate.",
    skills: ["deployment-procedures", "server-management"],
    triggers: ["deploy", "docker", "ci/cd", "github actions", "nginx", "pm2"],
  },
  {
    id: "game-developer",
    name: "Game Developer",
    group: AGENT_GROUPS.ARCHITECTS,
    tagline: "Canvas, physics & game loops",
    description:
      "Deep logic for canvas rendering, physics engines, state machines, and game loops. Supports Phaser, Unity, and Godot workflows.",
    skills: ["game-development"],
    triggers: ["game", "canvas", "physics", "phaser", "unity", "godot"],
  },
  // --- Guards ---
  {
    id: "security-auditor",
    name: "Security Auditor",
    group: AGENT_GROUPS.GUARDS,
    tagline: "Security compliance & OWASP",
    description:
      "Scans for vulnerabilities, secrets, and misconfigurations. Follows OWASP Top 10 and enforces authentication best practices.",
    skills: ["vulnerability-scanner", "red-team-tactics"],
    triggers: ["security", "vulnerability", "auth", "owasp", "compliance", "secrets"],
  },
  {
    id: "penetration-tester",
    name: "Penetration Tester",
    group: AGENT_GROUPS.GUARDS,
    tagline: "Offensive security & red team",
    description:
      "Thinks like an attacker. Follows PTES methodology to find exploits before bad actors do. Strictly read-only on production.",
    skills: ["red-team-tactics"],
    triggers: ["pentest", "exploit", "red team", "attack simulation"],
  },
  {
    id: "test-engineer",
    name: "Test Engineer",
    group: AGENT_GROUPS.GUARDS,
    tagline: "Testing pyramid & AAA patterns",
    description:
      "Focuses on the Testing Pyramid. Every test is structured as Arrange-Act-Assert. Writes unit, integration, and E2E tests.",
    skills: ["testing-patterns", "tdd-workflow", "webapp-testing"],
    triggers: ["test", "coverage", "vitest", "jest", "playwright", "tdd"],
  },
  {
    id: "qa-automation-engineer",
    name: "QA Automation Engineer",
    group: AGENT_GROUPS.GUARDS,
    tagline: "E2E testing & CI pipelines",
    description:
      "Builds robust E2E and automated test suites. Integrates with CI/CD to gate deployments on quality standards.",
    skills: ["webapp-testing", "testing-patterns"],
    triggers: ["e2e", "automation", "ci gate", "playwright", "regression"],
  },
  {
    id: "debugger",
    name: "Debugger",
    group: AGENT_GROUPS.GUARDS,
    tagline: "Root cause analysis",
    description:
      "Uses systematic root-cause analysis rather than 'guess-and-check' fixes. Bisects bugs, reads stack traces, and documents findings.",
    skills: ["systematic-debugging"],
    triggers: ["bug", "error", "broken", "fix", "crash", "debug"],
  },
  // --- Specialists ---
  {
    id: "code-archaeologist",
    name: "Code Archaeologist",
    group: AGENT_GROUPS.SPECIALISTS,
    tagline: "Legacy refactoring (Chesterton's Fence)",
    description:
      "Expert at refactoring messy legacy systems. Follows Chesterton's Fence: understand WHY code exists before removing it.",
    skills: ["clean-code", "code-review-checklist"],
    triggers: ["refactor", "legacy", "cleanup", "technical debt", "old code"],
  },
  {
    id: "performance-optimizer",
    name: "Performance Optimizer",
    group: AGENT_GROUPS.SPECIALISTS,
    tagline: "Core Web Vitals & load times",
    description:
      "Obsessed with LCP, CLS, and INP. Profiles before optimizing—never optimizes by assumption.",
    skills: ["performance-profiling", "seo-fundamentals"],
    triggers: ["slow", "performance", "lighthouse", "web vitals", "optimize"],
  },
  {
    id: "seo-specialist",
    name: "SEO Specialist",
    group: AGENT_GROUPS.SPECIALISTS,
    tagline: "Ranking, visibility & E-E-A-T",
    description:
      "Ensures semantic HTML, metadata excellence, and Core Web Vitals compliance. Optimizes for both crawlers and LLMs (GEO).",
    skills: ["seo-fundamentals", "geo-fundamentals"],
    triggers: ["seo", "meta", "ranking", "sitemap", "schema.org", "opengraph"],
  },
  {
    id: "documentation-writer",
    name: "Documentation Writer",
    group: AGENT_GROUPS.SPECIALISTS,
    tagline: "Manuals, READMEs & architecture docs",
    description:
      "Keeps architecture clear and READMEs readable. Only invoked when documentation is explicitly requested.",
    skills: ["documentation-templates"],
    triggers: ["docs", "readme", "manual", "wiki", "jsdoc"],
  },
  {
    id: "explorer-agent",
    name: "Explorer Agent",
    group: AGENT_GROUPS.SPECIALISTS,
    tagline: "Codebase intelligence gathering",
    description:
      "Used for survey and intelligence gathering on large codebases. Read-only—never writes files, only maps and reports.",
    skills: [],
    triggers: ["explore", "analyze codebase", "find files", "map", "discover"],
  },
];

export const agentStats = {
  total: 21,
  masters: agents.filter((a) => a.group === AGENT_GROUPS.MASTERS).length,
  architects: agents.filter((a) => a.group === AGENT_GROUPS.ARCHITECTS).length,
  guards: agents.filter((a) => a.group === AGENT_GROUPS.GUARDS).length,
  specialists: agents.filter((a) => a.group === AGENT_GROUPS.SPECIALISTS).length,
};
