export const skillCategories = [
  {
    name: "Frontend & UI",
    skills: [
      { id: "react-best-practices", label: "React Best Practices", description: "React & Next.js performance optimization — 57 rules from Vercel." },
      { id: "web-design-guidelines", label: "Web Design Guidelines", description: "100+ rules for accessibility, UX, and performance." },
      { id: "tailwind-patterns", label: "Tailwind Patterns", description: "Tailwind CSS v4 utility patterns and design tokens." },
      { id: "frontend-design", label: "Frontend Design", description: "UI/UX patterns, design systems, and Deep Design Thinking." },
      { id: "ui-ux-pro-max", label: "UI/UX Pro Max", description: "50 styles, 97 palettes, 57 font pairings, 99 UX guidelines." },
    ],
  },
  {
    name: "Backend & API",
    skills: [
      { id: "api-patterns", label: "API Patterns", description: "REST, GraphQL, and tRPC design patterns." },
      { id: "nodejs-best-practices", label: "Node.js Best Practices", description: "Async, modules, and error handling standards." },
      { id: "python-patterns", label: "Python Patterns", description: "Python standards and FastAPI best practices." },
    ],
  },
  {
    name: "Database",
    skills: [
      { id: "database-design", label: "Database Design", description: "Schema design, normalization, and query optimization." },
    ],
  },
  {
    name: "Architecture & Planning",
    skills: [
      { id: "app-builder", label: "App Builder", description: "Full-stack app scaffolding with blueprint.json generation." },
      { id: "architecture", label: "Architecture", description: "System design patterns and ADR documentation." },
      { id: "plan-writing", label: "Plan Writing", description: "Task planning, breakdown, and PLAN.md generation." },
      { id: "brainstorming", label: "Brainstorming", description: "Socratic questioning and option exploration." },
    ],
  },
  {
    name: "Testing & Quality",
    skills: [
      { id: "testing-patterns", label: "Testing Patterns", description: "Jest, Vitest, and testing strategy guidelines." },
      { id: "webapp-testing", label: "Web App Testing", description: "E2E testing with Playwright." },
      { id: "tdd-workflow", label: "TDD Workflow", description: "Test-driven development process." },
      { id: "code-review-checklist", label: "Code Review", description: "Comprehensive code review standards." },
      { id: "lint-and-validate", label: "Lint & Validate", description: "Linting and validation automation." },
    ],
  },
  {
    name: "Security",
    skills: [
      { id: "vulnerability-scanner", label: "Vulnerability Scanner", description: "Security auditing and OWASP Top 10 compliance." },
      { id: "red-team-tactics", label: "Red Team Tactics", description: "Offensive security and penetration testing." },
    ],
  },
  {
    name: "Performance & SEO",
    skills: [
      { id: "performance-profiling", label: "Performance Profiling", description: "Web Vitals measurement and optimization." },
      { id: "seo-fundamentals", label: "SEO Fundamentals", description: "SEO, E-E-A-T, and Core Web Vitals optimization." },
      { id: "geo-fundamentals", label: "GEO Fundamentals", description: "GenAI optimization for LLM discoverability." },
    ],
  },
  {
    name: "DevOps & Cloud",
    skills: [
      { id: "deployment-procedures", label: "Deployment Procedures", description: "CI/CD pipelines and deploy workflows." },
      { id: "server-management", label: "Server Management", description: "Infrastructure management and monitoring." },
    ],
  },
  {
    name: "Platform Skills",
    skills: [
      { id: "mobile-design", label: "Mobile Design", description: "React Native and Flutter UI/UX patterns." },
      { id: "game-development", label: "Game Development", description: "Game logic, physics, and scene management." },
      { id: "mcp-builder", label: "MCP Builder", description: "Model Context Protocol tool and server creation." },
    ],
  },
  {
    name: "Standards",
    skills: [
      { id: "clean-code", label: "Clean Code", description: "Universal coding standards with 2026 ESM defaults." },
      { id: "behavioral-modes", label: "Behavioral Modes", description: "Agent persona and interaction guidelines." },
      { id: "parallel-agents", label: "Parallel Agents", description: "Multi-agent coordination patterns." },
      { id: "documentation-templates", label: "Documentation Templates", description: "README, ADR, and API doc formats." },
      { id: "i18n-localization", label: "I18n & Localization", description: "Internationalization patterns and tooling." },
      { id: "systematic-debugging", label: "Systematic Debugging", description: "Root-cause analysis troubleshooting framework." },
    ],
  },
];

export const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0);
