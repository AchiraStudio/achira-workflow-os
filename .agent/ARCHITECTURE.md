# Achira Workflow — Architecture

> Unified AI-Driven Development Ecosystem — v5.1.0

---

## 📋 Overview

Achira Workflow is an Antigravity-native agentic engineering ecosystem consisting of:

- **21 Specialist Agents** — Role-based AI personas + AI Specialist
- **60 Skills** — 7 Native Master Pillars + 53 Progressive Domain Knowledge Modules
- **25 Workflows** — 11 Mission-Critical Scaffolds + 14 Operational Slash Commands
- **Persistent Memory System** — Cross-session context, preferences, conventions, decisions
- **Native Antigravity Integration** — Runtime contract (`antigravity.json`), `PreToolUse` safety gate (`hooks.json`), Antigravity Doctor, MCP synchronization

---

## 🏗️ Directory Structure

```plaintext
.agent/
├── ARCHITECTURE.md              # System design and component inventory
├── antigravity.json             # Antigravity runtime contract
├── hooks.json                   # Native PreToolUse safety gate registration
├── mcp_config.json              # Workspace MCP server configuration
├── memory/                      # Persistent cross-session memory
│   ├── MEMORY.md                # Memory index
│   ├── feedback-history.md
│   ├── project-conventions.md
│   ├── tech-decisions.md
│   └── user-preferences.md
├── hooks/                       # Antigravity safety gate, doctor, MCP sync, schemas
│   ├── validate-tool-call.mjs   # Native PreToolUse execution policy
│   ├── antigravity-doctor.mjs   # System health and runtime diagnostics
│   ├── sync-mcp.mjs             # MCP synchronization helper
│   ├── build-plugin.mjs         # Antigravity plugin packager
│   └── schemas/
├── core/                        # The brain — agents, skills, shared data
│   ├── agents/                  # 21 Specialist Agents
│   ├── skills/                  # 60 Skills (7 Pillars + 53 Domain Skills)
│   └── shared/                  # Shared data (ui-ux-pro-max data & styles)
├── workflows/                   # All 25 workflows + dynamic registry
│   ├── registry.json            # Dynamic workflow & template discovery
│   ├── coordinate.md            # Advanced multi-agent parallel coordination
│   ├── remember.md              # Persistent memory management
│   ├── verify.md                # Runtime execution verification
│   ├── orchestrate.md           # Squad coordination
│   ├── plan.md                  # Task breakdown & {task-slug}.md
│   ├── brainstorm.md            # Socratic discovery
│   ├── create.md                # Full app creation & design spec router
│   ├── enhance.md               # Safe modification & regression testing
│   ├── debug.md                 # Root cause analysis
│   ├── test.md                  # AAA test generation & execution
│   ├── deploy.md                # 5-phase production release
│   ├── preview.md               # Dev server daemon lifecycle
│   ├── status.md                # Project & agent health board
│   ├── ui-ux-pro-max.md         # 50 styles, 95+ palettes, design tokens
│   ├── react+vite.md            # React SPA scaffold
│   ├── next.js.md               # Next.js App Router scaffold
│   ├── html+js+css.md           # Vanilla HTML/CSS/JS scaffold
│   ├── saas.md                  # Fullstack SaaS (Next + Supabase + Stripe)
│   ├── landing-page.md          # SEO-optimized marketing scaffold
│   ├── avalonia.md              # C# Desktop scaffold
│   ├── flutter.md               # Flutter Dart 3 mobile scaffold
│   ├── shopify.md               # Shopify app/extension/theme scaffold
│   ├── unity.md                 # Unity 6 LTS C# game scaffold
│   ├── python-backend.md        # FastAPI backend scaffold
│   └── database.md              # Schema & RLS policy design
├── rules/                       # Global & modular rules
│   ├── GEMINI.md                # Global AI behavior rules
│   ├── universal-rules.md
│   ├── request-routing.md
│   ├── code-rules.md
│   ├── design-rules.md
│   └── quick-reference.md
└── scripts/                     # Verification suite & lifecycle daemons
    ├── verify_all.py            # Complete multi-phase verification suite
    ├── validation_runner.py     # Shared runner engine
    ├── checklist.py             # Development checklist
    ├── session_manager.py       # Session state manager
    └── auto_preview.py          # Preview server daemon
```

---

## 🤖 Agents (21)

Specialist AI personas for different engineering domains.

| Agent                    | Squadron        | Focus Area                 | Skills Used                                                                                   |
| ------------------------ | --------------- | -------------------------- | --------------------------------------------------------------------------------------------- |
| `orchestrator`           | Strategists     | Multi-agent coordination   | `coordinator-mode`, `parallel-agents`, `context-compression`, `memory-system`, `verify-changes` |
| `project-planner`        | Strategists     | Discovery, task planning   | `brainstorming`, `plan-writing`, `architecture`                                               |
| `product-owner`          | Strategists     | Strategy, backlog, MVP     | `plan-writing`, `brainstorming`                                                               |
| `product-manager`        | Strategists     | Requirements, user stories | `plan-writing`, `brainstorming`                                                               |
| `ai-specialist`          | Strategists     | LLMs, RAG, prompt ops      | `ai-expert`, `clean-code`, `verify-changes`                                                   |
| `frontend-specialist`    | Builders        | Web UI/UX, Design Systems  | `frontend-design`, `nextjs-react-expert`, `tailwind-patterns`, `design-spec`, `web-expert`    |
| `backend-specialist`     | Builders        | API, business logic, ORM   | `api-patterns`, `nodejs-best-practices`, `python-patterns`, `database-design`, `backend-expert`|
| `mobile-developer`       | Builders        | iOS, Android, Flutter, RN  | `mobile-design`, `app-expert`, `clean-code`                                                   |
| `game-developer`         | Builders        | Game logic, mechanics      | `game-development`, `game-expert`, `clean-code`                                               |
| `security-auditor`       | Sentinels       | Security compliance, OWASP | `vulnerability-scanner`, `red-team-tactics`                                                   |
| `penetration-tester`     | Sentinels       | Offensive security         | `red-team-tactics`, `vulnerability-scanner`                                                   |
| `test-engineer`          | Sentinels       | Testing strategies (AAA)   | `testing-patterns`, `tdd-workflow`, `webapp-testing`                                          |
| `qa-automation-engineer` | Sentinels       | E2E testing, CI pipelines  | `webapp-testing`, `testing-patterns`                                                          |
| `debugger`               | Sentinels       | Root cause analysis (RCA)  | `systematic-debugging`, `verify-changes`                                                      |
| `database-architect`     | Analysts        | Schema, SQL, migrations    | `database-design`, `backend-expert`                                                           |
| `code-archaeologist`     | Analysts        | Legacy code, refactoring   | `clean-code`, `code-review-checklist`, `simplify-code`                                        |
| `performance-optimizer`  | Analysts        | Speed, Core Web Vitals     | `performance-profiling`, `bundle_analyzer`                                                    |
| `devops-engineer`        | Analysts        | CI/CD, Docker, cloud       | `deployment-procedures`, `server-management`                                                  |
| `seo-specialist`         | Growth          | Ranking, visibility, GEO   | `seo-fundamentals`, `geo-fundamentals`                                                        |
| `documentation-writer`   | Operations      | Manuals, specs, docs       | `documentation-templates`                                                                     |
| `explorer-agent`         | Discovery       | Codebase exploration       | Read, Grep, Glob                                                                              |

---

## 🧩 Skills (60)

### 1. Master Expert Pillars (7)
High-density internalized expert domain knowledge:
- `web-expert`: Next.js 15, React 19, vanilla web, modern SSR/SPA architecture.
- `backend-expert`: FastAPI, Pydantic v2, PythonPro, Node.js, database schemas & RLS.
- `commerce-expert`: Shopify App, Theme, Extensions, secure Stripe integrations.
- `ai-expert`: Vector search (pgvector), RAG architectures, prompt injection defenses.
- `app-expert`: Flutter (Dart 3/Riverpod) and Avalonia (C#/Zafiro) architecture.
- `game-expert`: Unity 6 LTS C# zero-allocation and object-pooling patterns.
- `project-setup`: Universal standards, clean architecture, directory conventions.

### 2. Frontend & UI (7)
- `design-spec`: `DESIGN.md` token format — required design source-of-truth before UI.
- `nextjs-react-expert`: React & Next.js performance optimization (58 production rules).
- `frontend-architecture`: Frontend layers, state tiers, services separation.
- `web-design-guidelines`: Web UI audit — accessibility, UX, and performance.
- `tailwind-patterns`: Tailwind CSS v4 utilities and modern styles.
- `frontend-design`: UI/UX design tokens, components, visual hierarchy.
- `ui-ux-pro-max`: 50 design styles, 95+ palettes, and automatic design systems.

### 3. Backend & Database (5)
- `api-patterns`: RESTful, GraphQL, and tRPC standards.
- `nodejs-best-practices`: Node.js async, error handling, ESM modules.
- `python-patterns`: Modern Python standards, typing, FastAPI idioms.
- `rust-pro`: Systems programming, memory safety, async patterns.
- `database-design`: Normalization, indexing, migrations, Supabase/Postgres.

### 4. Orchestration, Coordination & Memory (9)
- `coordinator-mode`: Multi-agent orchestration with parallel workers and synthesis.
- `parallel-agents`: Parallel worker execution patterns and safety bounds.
- `memory-system`: Persistent cross-session memory with `MEMORY.md` index.
- `context-compression`: Automatic context compaction for long sessions.
- `verify-changes`: Prove code works by executing it (evidence over claims).
- `batch-operations`: Multi-file pattern-based modifications.
- `simplify-code`: Complexity reduction and anti-overengineering.
- `skillify`: Automated skill extraction from repetitive workflows.
- `code-review-graph`: Token-efficient AST code review.

### 5. Testing & Quality (7)
- `testing-patterns`: Unit & integration testing with Vitest/Jest (AAA pattern).
- `webapp-testing`: End-to-end testing with Playwright.
- `tdd-workflow`: Test-driven development red-green-refactor loop.
- `code-review-checklist`: Standardized peer review rubrics.
- `lint-and-validate`: Static analysis, linting, and type checking.
- `clean-code`: Global readability and maintainability standards.
- `systematic-debugging`: 4-phase root-cause analysis and reproduction.

### 6. Cloud, DevOps & Security (4)
- `deployment-procedures`: 5-phase zero-downtime release runbooks.
- `server-management`: Infrastructure, systemd, PM2, process daemons.
- `vulnerability-scanner`: Static code security analysis and OWASP checks.
- `red-team-tactics`: Offensive security and penetration testing.

### 7. Specialized & Operations (15)
- `mobile-design`, `game-development`, `seo-fundamentals`, `geo-fundamentals`, `i18n-localization`, `powershell-windows`, `bash-linux`, `mcp-builder`, `documentation-templates`, `brainstorming`, `plan-writing`, `architecture`, `app-builder`, `behavioral-modes`, `intelligent-routing`.

### 8. Anti-Slop Engineering (6)
- `antislop`: Core anti-slop rules, usage modes, and delivery gate.
- `antislop-copywriting`: Anti-AI marketing copy, banned corporate clichés, headline craft.
- `antislop-code`: Clean code comments without restating trivial implementation or AI noise.
- `antislop-ui`: Visual interface craftsmanship without generic cards, AI glows, or clichés.
- `antislop-human`: Human accessibility, keyboard navigation, and WCAG contrast check.
- `antislop-layoutmobile`: Mobile-first responsive layouts, viewport scaling, and touch ergonomics.

---

## 🔄 Workflows (25)

### Operational Commands (14)
| Command | Purpose | Injected Skills |
| --- | --- | --- |
| `/orchestrate` | Lead multi-agent squadrons | `coordinator-mode`, `parallel-agents`, `context-compression`, `verify-changes` |
| `/coordinate` | Parallel dispatch & synthesis | `coordinator-mode`, `parallel-agents`, `plan-writing` |
| `/plan` | Socratic blueprinting & `{task-slug}.md` | `plan-writing`, `architecture`, `brainstorming` |
| `/brainstorm` | Socratic discovery & trade-offs | `brainstorming`, `architecture` |
| `/create` | Feature & application builder | `app-builder`, `design-spec`, `verify-changes` |
| `/enhance` | Safe feature additions & updates | `simplify-code`, `clean-code`, `verify-changes` |
| `/debug` | Systematic root-cause analysis | `systematic-debugging`, `verify-changes` |
| `/test` | AAA unit & integration test generation | `testing-patterns`, `tdd-workflow`, `webapp-testing` |
| `/verify` | Prove code changes work by execution | `verify-changes`, `lint-and-validate` |
| `/deploy` | 5-phase production release & pre-flight | `deployment-procedures`, `server-management` |
| `/preview` | Dev server daemon lifecycle | `verify-changes` |
| `/remember` | Save to persistent cross-session memory | `memory-system` |
| `/status` | Project & agent status board | `context-compression`, `memory-system` |
| `/ui-ux-pro-max`| 50 styles, 95+ palettes, tokens | `design-spec`, `frontend-design`, `web-design-guidelines` |

### Project Scaffolds (11)
| Template | Command | Description |
| --- | --- | --- |
| React + Vite | `/react` | React SPA + Absolute Imports + Vitest |
| Next.js | `/next` | Next.js App Router + Feature Architecture |
| Vanilla Web | `/html` | Vanilla HTML + CSS + JS (Vite Dev Server) |
| SaaS | `/saas` | Next.js 15 + Supabase Auth/DB + Stripe |
| Landing Page | `/landing-page` | SEO/GEO-optimized marketing foundations |
| Avalonia | `/avalonia` | C# Desktop with Avalonia & Zafiro MVVM |
| Flutter | `/flutter` | Multi-platform Dart 3 with Riverpod |
| Shopify | `/shopify` | Shopify App, Theme, or CLI Extension |
| Unity | `/unity` | Unity 6 LTS C# zero-allocation game dev |
| Python Backend | `/python-backend`| High-performance FastAPI managed by `uv` |
| Database | `/database` | Schema design, normalization, & RLS |

---

## 🛡️ Antigravity Runtime Integration

Achira Workflow OS adheres to the Google Antigravity runtime contract across both local workspace and global machine scopes:

1. **Local Discovery**: Automatically discovered from `.agents/` or `.agent/` at repository root.
2. **Global Discovery**:
   - Packaged as a global plugin in `~/.gemini/config/plugins/achira-workflow-os/` exposing all 21 agents, 60 skills, rules (`rules/AGENTS.md`), and safety hooks (`hooks.json`).
   - Global skills in `~/.gemini/config/skills/` providing immediate on-demand access in any folder across the machine.
   - Global rules in `~/.gemini/GEMINI.md` enforcing anti-slop guidelines and agent routing.
3. **PreToolUse Safety Gate**: Registers `hooks.json` to inspect `run_command` payloads and prevent destructive commands (root filesystem deletion, raw-drive formatting).
4. **Diagnostics**: `achira-wf doctor` (local) and `achira-wf doctor --global` / `achira-wf global doctor` validate environment, MCP endpoints, hooks, and release readiness.
5. **Persistent Memory**: Durable cross-session memory in `.agent/memory/` and `.agents/memory/`.
6. **Global CLI**: Managed by `lib/global-manager.js` with commands `achira-wf global install`, `achira-wf global sync`, `achira-wf global doctor`, and `achira-wf global status`.

