# ⚡ Achira Workflow V5.2

> **The premier multi-agent orchestration framework for AI-native software engineering.**

Achira Workflow V5.2 is a high-performance ecosystem of **21 specialist agents** and **85 unified skills** (25 command & scaffolding skills + 60 core engineering pillars), built natively for Google Antigravity & Gemini.

_Based on [antigravity-kit](https://github.com/vudovn/antigravity-kit)_

[![npm version](https://img.shields.io/npm/v/achira-wf?style=for-the-badge&color=success)](https://www.npmjs.com/package/achira-wf)
[![License](https://img.shields.io/github/license/AchiraStudio/achira-workflow-os?style=for-the-badge&color=orange)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/AchiraStudio/achira-workflow-os?style=for-the-badge)](https://github.com/AchiraStudio/achira-workflow-os/stargazers)
[![Issues](https://img.shields.io/github/issues/AchiraStudio/achira-workflow-os?style=for-the-badge)](https://github.com/AchiraStudio/achira-workflow-os/issues)

---

## ✨ Why Achira Workflow?

Most AI tools just "code." Achira **thinks**, **architects**, and **verifies**.

- 🧠 **Socratic Discovery**: Mandatory discovery layers that prevent architectural debt before a single file is created.
- 🎨 **Deep Design Thinking**: Built-in design intelligence (`DESIGN.md` token specification and `/ui-ux-pro-max` with 50+ styles) rejecting generic templates in favor of crafted UI/UX.
- 🛡️ **Mission-Critical Integrity**: A multi-layered verification engine (Security → Lint → Tests → UX) ensuring every commit is production-ready.
- ⚡ **Native Safety Hook**: PreToolUse gate preventing high-confidence destructive operations.
- 🧠 **Persistent Memory**: Cross-session recall for conventions, preferences, and technical decisions (`.agent/memory/`).
- 🚀 **Standardized Excellence**: Strict enforcement of Clean Code, Accessibility (WCAG AA), and Performance guidelines across all projects.
- 🌍 **Unified Skill Architecture**: All capabilities unified into 85 modern Antigravity skills with zero-latency discovery and standardized YAML frontmatter.

---

## 🏗️ Installation

Achira Workflow OS is designed to be accessible both **globally across all projects** and **locally within individual codebases**.

### 1. Install via NPM

Install the CLI globally on your system:

```bash
npm install -g achira-wf
```

### 2. Enable Globally Across All Projects (One Command)

Deploy Achira Workflow OS to your machine's global Google Antigravity & Gemini runtime (`~/.gemini/config/`):

```bash
achira-wf global install
```

> **Instant Machine-Wide Superpowers:** All **21 specialized agents**, **85 unified skills**, and universal anti-slop rules immediately become active across **every folder and project** you open in Google Antigravity or Gemini CLI—with zero project configuration required!

### 3. Initialize in a Specific Project (Optional Project Workflows)

When you want local workspace skills, IDE slash command auto-completion, and dedicated project memory:

```bash
achira-wf init
```

_This installs `.agent/`, syncs `.agent/skills/` and `.agent/hooks.json`, links `.cursorrules`, and configures the PreToolUse safety gate for that repository._

---

## 🚀 One-Click Scaffolding

Achira Workflow OS enables high-performance scaffolding directly through your AI assistant. Once `achira-wf init` is run, all templates become available as **slash commands** in your IDE.

```bash
# Web Foundations
/react          # React + Vite SPA (Service Layer, Router, Vitest)
/next           # Next.js App Router (Fullstack Feature Architecture)
/html           # Vanilla HTML + CSS + JS (Vite HMR)

# Verticals
/saas           # Next.js 15 + Supabase Auth/DB + Stripe
/landing-page   # SEO & GEO-Optimized Marketing Page

# Apps & Desktop
/flutter        # Multi-platform Dart 3 (Riverpod Clean Architecture)
/avalonia       # C# Desktop (Zafiro / Reactive MVVM)

# Specialized
/shopify        # Apps, Extensions, or Themes
/unity          # Unity 6 LTS C# Game Dev (Zero-Allocation)
/python-backend # FastAPI / Django (managed by uv)
/database       # Schema Design & RLS Policies
```

---

## 🤖 The Elite Agents

Achira OS deploys a specialized task force of 21 agents for every domain.

| Squadron            | Role                                                                                   |
| :------------------ | :------------------------------------------------------------------------------------- |
| **The Strategists** | `orchestrator`, `project-planner`, `product-owner`, `product-manager`, `ai-specialist` |
| **The Builders**    | `frontend-specialist`, `backend-specialist`, `mobile-developer`, `game-developer`      |
| **The Sentinels**   | `security-auditor`, `penetration-tester`, `qa-automation-engineer`, `test-engineer`, `debugger` |
| **The Analysts**    | `database-architect`, `code-archaeologist`, `performance-optimizer`, `devops-engineer` |
| **Specialized**     | `seo-specialist`, `documentation-writer`, `explorer-agent`                             |

---

## 🛠 Advanced CLI Commands

While most day-to-day work happens via slash commands, the CLI provides core lifecycle tools.

| Command                    | Purpose                                                                                |
| :------------------------- | :------------------------------------------------------------------------------------- |
| `achira-wf global install` | **NEW** Deploy Achira OS globally into `~/.gemini/config/` for machine-wide access.     |
| `achira-wf global doctor`  | **NEW** Validate health of the global Antigravity plugin, 85 skills, and agents.       |
| `achira-wf global sync`    | **NEW** Sync the latest agents and skills to the global environment.                   |
| `achira-wf global status`  | **NEW** View global installation paths and active status.                              |
| `achira-wf init`           | Install or repair the `.agent/` core and sync `.agent/` in the target folder.          |
| `achira-wf list`           | View all registered skills, commands, and templates.                                  |
| `achira-wf doctor`         | Check system integrity of the local workspace (or use `-g` for global check).         |

---

## 🍱 Operational Skills & Commands

Access 14 powerful operational slash commands once the OS is initialized:

- `/orchestrate`: Lead a cross-domain squad of specialist agents through complex tasks.
- `/coordinate`: **NEW** Advanced multi-agent coordination with parallel dispatch and synthesis.
- `/plan`: Generate deep implementation blueprints (`{task-slug}.md`) before coding.
- `/brainstorm`: Explore alternatives, pros/cons, and architectural trade-offs.
- `/create`: Interactive feature and app builder with mandatory `DESIGN.md` spec.
- `/enhance`: Safely modify and extend existing code with regression prevention.
- `/verify`: **NEW** Prove code changes work through concrete runtime execution.
- `/remember`: **NEW** Save conventions, preferences, and decisions to persistent memory.
- `/ui-ux-pro-max`: Access 50+ unique design styles, 95+ palettes, and premium UI tokens.
- `/debug`: Systematically investigate and resolve bugs with evidence-based root-cause analysis.
- `/test`: Generate comprehensive AAA test suites with Vitest/Jest.
- `/deploy`: 5-phase production release pre-flight checks and rollback runbooks.
- `/preview`: Lifecycle management for local dev server daemons.
- `/status`: Live project and agent health dashboard.

## 🍱 Visual Showcase

Experience the full power of Achira Workflow OS in action. Our official showcase is a premium React + Vite application, engineered from the ground up using our very own `/react+vite` skill.

It serves as a living blueprint for:

- 🎨 **Premium UI/UX**: High-fidelity Sapphire Glassmorphism and fluid motion.
- 🏗️ **Service-Oriented Architecture**: Clean separation of concerns and scalable logic.
- ⚡ **Performance**: Optimized asset delivery and lightning-fast interactions.

👉 **[Live Showcase](https://achira-workflow-os.pages.dev/)**

---

## � License

Distributed under the MIT License. See `LICENSE` for more information.

---

> Built for the next era of development. **Stop coding. Start orchestrating.**
