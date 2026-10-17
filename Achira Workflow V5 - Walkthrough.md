# Achira Workflow V5.2 — Technical Walkthrough

Welcome to the future of agentic engineering. Achira Workflow V5.2 is a massive leap forward in how AI assistants perceive, plan, and execute complex software engineering tasks.

By combining high-density **7 Native Master Pillars** with **53 progressive domain skills** (60 core engineering skills) plus **25 command & scaffolding skills** (**85 unified skills** total), and a **Google Antigravity-native runtime contract**, we have created a development ecosystem that is faster, safer, and globally accessible across every project on your machine.

---

## 🏗️ 1. The Core Infrastructure

### Native Skill Engine (7 Master Pillars + 53 Domain Skills = 60 Skills)

Achira replaces external bloated rule sets with 60 high-density, progressively disclosed skills located in `.agent/skills/`:

1.  **`web-expert`**: The gold standard for Next.js 15, React 19, and vanilla web. Covers performance, SEO, and strict TS/JS patterns.
2.  **`app-expert`**: Architectures for Mobile (Flutter/Dart 3) and Desktop (Avalonia/C#), enforcing Clean Architecture and MVVM.
3.  **`game-expert`**: High-performance Unity development focusing on Memory Management (Zero-allocation) and Object Pooling.
4.  **`backend-expert`**: Advanced FastAPI logic, Pydantic v2 validation, and robust Database Schema/RLS design.
5.  **`commerce-expert`**: Specialized logic for Shopify Apps/Themes and secure Stripe payment integrations.
6.  **`ai-expert`**: The blueprint for AI-native software. Covers RAG pipelines, LLM orchestration, and ethical prompt engineering.
7.  **`devops-expert` / `project-setup`**: Production-grade engineering. Single source of truth for Clean Code, CI/CD, and directories.
8.  **Progressive Domain Skills (47)**: Including `design-spec` (mandatory `DESIGN.md` tokens), `nextjs-react-expert` (58 Vercel performance rules), `coordinator-mode`, `parallel-agents`, `memory-system`, `verify-changes`, `systematic-debugging`, `vulnerability-scanner`, and `testing-patterns`.

---

## 🚀 2. Mission-Critical Workflows (25 Total)

V5 delivers 25 distinct workflows: 11 scaffolds and 14 operational slash commands.

### Scaffolding Workflows (11)

- **`/react`**: Scalable SPA with Service Layer, Absolute Imports, and Vitest.
- **`/next`**: Enterprise App Router setup with Feature-driven folders.
- **`/saas`**: Startup-in-a-Box — Next.js 15 + Supabase + Stripe.
- **`/landing-page`**: SEO & GEO-optimized, high-performance marketing foundations.
- **`/html`**: Modernized Vanilla Web with Vite-powered HMR.
- **`/flutter`**: Production-ready Dart 3 scaffold with Riverpod state management.
- **`/avalonia`**: Modern C# Desktop architecture using the Zafiro toolkit.
- **`/unity`**: High-performance C# game development foundations.
- **`/python-backend`**: Modern FastAPI setup managed by `uv`.
- **`/database`**: Pure architectural guidance for SQL/NoSQL and Security policies.
- **`/shopify`**: Smart routing for Shopify App, Extension, or Theme development.

### Operational Commands (14)

- **`/orchestrate`**: Lead cross-domain squads of specialist agents.
- **`/coordinate`**: Advanced multi-agent coordination with parallel dispatch and synthesis.
- **`/plan`**: Socratic task blueprinting and `{task-slug}.md` generation without premature code.
- **`/brainstorm`**: Explore 3+ distinct approaches with pros/cons and trade-offs.
- **`/create`**: Full-app builder with mandatory `DESIGN.md` token specification.
- **`/enhance`**: Iterative feature additions with regression prevention and clean code standards.
- **`/debug`**: Systematic 4-phase root-cause analysis rejecting guess-and-check.
- **`/test`**: Generate comprehensive AAA (Arrange-Act-Assert) test suites.
- **`/verify`**: Prove code changes work through concrete runtime execution.
- **`/remember`**: Save conventions, preferences, and decisions to persistent memory.
- **`/ui-ux-pro-max`**: Access 50+ unique design styles, 95+ palettes, and design tokens.
- **`/deploy`**: 5-phase production release pre-flight checks and rollback runbooks.
- **`/preview`**: Lifecycle management for local dev server daemons.
- **`/status`**: Live project and agent health dashboard.

---

## 🧠 3. Persistent Memory System

Located in `.agent/memory/` (and `.agents/memory/`), the persistent memory engine enables cross-session continuity:

- `MEMORY.md`: One-line index mapping topics to specific storage files.
- `project-conventions.md`: Coding standards, branch naming, repository rules.
- `tech-decisions.md`: Architecture Decision Records (ADRs) and library choices.
- `user-preferences.md`: Developer tooling preferences (e.g. package managers, formats).
- `feedback-history.md`: Corrections and guidance remembered across sessions.

---

## 🌐 4. Global Accessibility Across All Projects

Achira Workflow V5.1 operates **machine-wide across every project** without needing manual `.agent/` setup in every folder:

1. **Global Plugin (`~/.gemini/config/plugins/achira-workflow-os/`)**:
   - Contains all **21 specialized agents** with full capability definitions.
   - Contains all **60 modern engineering skills**.
   - Contains `rules/AGENTS.md` and `hooks.json` for safety gates.
   - Automatically discovered and loaded by Google Antigravity & Gemini CLI in any workspace.
2. **Global Skills Engine (`~/.gemini/config/skills/`)**:
   - All 60 skills are registered in the global catalog, available immediately on-demand in any conversation.
3. **Global Machine Rules (`~/.gemini/GEMINI.md`)**:
   - Enforces universal anti-slop rules, clean code, accessibility, and agent routing protocol across all directories.
4. **Global CLI Management**:
   - `achira-wf global install`: One-click setup of global plugins, skills, and rules.
   - `achira-wf global doctor`: Diagnostic verification of machine-wide integration.
   - `achira-wf global sync`: Instant sync when new skills or agents are released.

---

## 🛡️ 5. Antigravity Runtime Integration & Native Safety Gate

- **PreToolUse Safety Gate**: Registers `hooks.json` to inspect `run_command` and block high-confidence destructive operations (root deletion, disk formatting).
- **Diagnostics**: `achira-wf doctor` checks all 21 agents, 85 skills, memory, rules, and runtime hooks.
- **IDE Discovery**: Skills are automatically synced to `.agent/skills/` so Antigravity, Cursor, and Gemini slash commands discover them instantly.


---

## 📈 6. How to Get Started

1. **Install Global CLI**: `npm install -g achira-wf`
2. **Enable Globally**: `achira-wf global install` (enables all 54 skills and 21 agents across all projects on your machine).
3. **Initialize Project (Optional)**: `achira-wf init` in any specific project root to enable project-scoped slash commands and persistent memory.
4. **Validate**: `achira-wf doctor` (or `achira-wf global doctor`) to verify system health.
5. **Orchestrate**: Use `/plan` to strategize, `/create` or `/saas` to build, and `/verify` to prove your code works.

---

> "Stop coding. Start orchestrating." — The Achira Team

