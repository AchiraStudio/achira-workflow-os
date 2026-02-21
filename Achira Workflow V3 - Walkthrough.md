# Achira Workflow OS V3 - The Master Guide

> **"The ultimate blueprint for AI-native software engineering."**

Welcome to the definitive guide for **Achira Workflow OS V3**. This document is a comprehensive exploration of the system's architecture, philosophy, and operational capabilities. It is designed to turn any developer into a master orchestrator of AI agents.

---

## 📑 Table of Contents

1. [Introduction & Philosophy](#-introduction--philosophy)
2. [Anatomy of the OS (`.achira/`)](#-anatomy-of-the-os-achira)
3. [The CLI Command Center (`achira-wf`)](#-the-cli-command-center-achira-wf)
4. [Agent Personas: The Elite 20](#-agent-personas-the-elite-20)
5. [The Skill Ecosystem (38 Domain Modules)](#-the-skill-ecosystem-38-domain-modules)
6. [Workflows & Scaffolding Strategies](#-workflows--scaffolding-strategies)
7. [The Verification Engine (Python & UV)](#-the-verification-engine-python--uv)
8. [Best Practices & Advanced Orchestration](#-best-practices--advanced-orchestration)

---

## � Introduction & Philosophy

Achira Workflow OS is not just a collection of scripts; it is an **Agentic Operating System**. It is built on three pillars:

### 1. Socratic Discovery

We believe that the most expensive line of code is the one that shouldn't have been written. The OS enforces a **Socratic Gate**—a mandatory discovery phase where the AI asks strategic questions about edge cases, trade-offs, and user intent before generating a single line of implementation.

### 2. Premium Design Standards

The OS is hardwired for aesthetic excellence. Through the **Purple Ban** and **Deep Design Thinking** protocols, it rejects generic "template-style" layouts in favor of vibrant, high-contrast, and unique interfaces that feel "alive."

### 3. Mission-Critical Integrity

Every feature is cross-verified. The system uses a multi-layered verification suite (Security → Lint → Tests → UX) ensuring that speed never comes at the cost of stability.

---

## 🏗 Anatomy of the OS (`.achira/`)

The `.achira/` directory is the root of the Agentic OS. Here is a granular breakdown:

- **`core/agents/`**: Contains the 20 `.md` files that define each agent's personality, triggers, and allowed skills.
- **`core/skills/`**: The knowledge base. Each folder (e.g., `clean-code`, `database-design`) contains a `SKILL.md` and supporting resources like scripts or examples.
- **`core/shared/`**: Assets shared across the OS, most notably the `ui-ux-pro-max` design dataset.
- **`workflows/`**: The procedural logic for slash commands. It includes the `registry.json` which maps commands to these procedures.
- **`scripts/`**: The Python verification engine, including the `shared_utils.py` library and master runners like `verify_all.py`.
- **`rules/`**: Global constraints and protocols (e.g., `GEMINI.md`) that apply to every AI interaction regardless of the active agent.
- **`ARCHITECTURE.md`**: The living map of the system, updated with counts and paths.

---

## 🛠 The CLI Command Center (`achira-wf`)

The `achira-wf` tool is your interface to the OS.

### Installation & Maintenance

- **`achira-wf init`**: Downloads and installs the `.achira/` core.
- **`achira-wf doctor`**: The ultimate health check. It verifies engine versions, file paths, and component counts. Use this if the AI feels "lost."

### Project Scaffolding

- **`achira-wf create <template>`**: Uses a registered template to build a foundation.
  - `react`: React + Vite + Router + Service Layer.
  - `next`: Next.js App Router + Feature-based architecture.
  - `html`: Vanilla multi-page project.

### Meta-Commands

- **`achira-wf list`**: Introspects the `registry.json` to show all available templates and operational slash commands.

---

## 🤖 Agent Personas: The Elite 20

Achira OS V3 uses a specialized agent routing system. Here is a deep-dive into the most critical personas:

### **The Masters (Strategic Logic)**

1.  **`orchestrator`**: The default commander. It classifies requests and recruits specialists.
2.  **`project-planner`**: An expert in task breakdown. It creates implementing plans and dependency graphs.
3.  **`product-owner`**: Focuses on business value and "The Why."

### **The Architects (Technical Logic)**

4.  **`frontend-specialist`**: The design master. Applies Purple Ban and modern typography.
5.  **`backend-specialist`**: Expert in API design, performance, and security.
6.  **`database-architect`**: Specializes in relational schemas, indexing, and ORM selection.
7.  **`mobile-developer`**: Dedicated strictly to React Native, Flutter, or native mobile targets.

### **The Guards (Integrity Logic)**

8.  **`security-auditor`**: Scans for vulnerabilities, secrets, and misconfigurations.
9.  **`penetration-tester`**: Thinks like an attacker. Follows PTES methodology to find exploits.
10. **`qa-automation-engineer`**: Builds robust E2E and unit test suites.
11. **`debugger`**: Uses root-cause analysis rather than "guess-and-check" fixes.

### **The Specialist Elite**

12. **`code-archaeologist`**: Expert at refactoring "messy" legacy systems. _Rule: Chesterton's Fence._
13. **`performance-optimizer`**: Obsessed with Core Web Vitals and load times.
14. **`seo-specialist`**: Ensures semantic HTML and metadata excellence.
15. **`devops-engineer`**: Manages CI/CD, previews, and infrastructure-as-code.
16. **`game-developer`**: Deep logic for canvas, physics, and game loops.
17. **`documentation-writer`**: Keeps the architecture clear and the READMEs readable.
18. **`explorer-agent`**: Used for survey and intelligence gathering on large codebases.
19. **`product-manager`**: Bridges the gap between user stories and technical tasks.
20. **`test-engineer`**: Focuses on the "Testing Pyramid" and AAA patterns.

---

## 📚 The Skill Ecosystem (38 Domain Modules)

Skills are selective knowledge bases that agents "load" into context.

### **Spotlight: `app-builder` & The Blueprint Protocol**

The `app-builder` skill is the core of scaffolding.

- **Blueprints**: It now generates a `blueprint.json` (logical skeleton) defining folder structures and core files before any code is generated. This prevents "architectural drift."

### **Spotlight: `ui-ux-pro-max` & Theme Generation**

This is the OS's secret weapon for aesthetics.

- **Design Data**: Contains curated CSVs for Colors, Typography, Landing Pages, and more.
- **Theme Generator**: A Python tool (`generate_theme.py`) that exports CSS tokens.
  - _Usage_: `python .achira/core/shared/ui-ux-pro-max/scripts/generate_theme.py [keyword]`
  - _Example keywords_: `fintech`, `healthcare`, `creative-agency`, `cybersecurity`.

### **Spotlight: `clean-code` & The Standards**

- **The AAA Pattern**: Every test must be structured as Arrange-Act-Assert.
- **2026 Standards**: Uses modern ESM, optional chaining, and nullish coalescing as defaults.

---

## 🛤 Workflows & Scaffolding Strategies

Workflows coordinate agents over long-running tasks.

### **The `/create` Workflow**

When you say `/create`, the OS triggers a sequence:

1.  **Analysis**: `app-builder` detects your project type.
2.  **Socratic Discovery**: The AI asks about your specific needs.
3.  **Planning**: `project-planner` creates a task map.
4.  **Blueprinting**: The skeleton is defined.
5.  **Generation**: Specialists build the code in logical chunks.
6.  **Preview**: The project is served for your review.

### **The `/orchestrate` Workflow**

Used for complex features touching multiple layers (e.g., "Add a login system").

- It recruits the `database-architect`, `backend-specialist`, and `frontend-specialist`.
- They communicate via "Internal Reasoning" to ensure their layers align.

---

## 🛡 The Verification Engine (Python & UV)

Verification is the "Final Boss" of any Achira workflow.

### **1. `shared_utils.py`: The Core**

A central hub for all verification logic.

- **`uv` Support**: If `uv` is installed, scripts run 2-5x faster.
- **Path Resolution**: Automatically finds the `.achira/` root whether you are in the project root or a subfolder.

### **2. `checklist.py`: The Developer Companion**

Runs "Quick Checks" in priority order.

- **P0 Security**: Never deploy a secret.
- **P1 Lint**: No broken syntax or types.
- **P2 Tests**: Core features must pass.
- **P3 UX/SEO**: Aesthetic and search check.

### **3. `verify_all.py`: The Release Runner**

The full verification suite. It includes Lighthouse performance audits and Playwright E2E browser tests. **It is mandatory before any production merge.**

---

## 🌟 Best Practices & Advanced Orchestration

1.  **Leverage Agent Specificity**: Don't just ask "the AI" to do something. Ask the specialist.
    - _Instead of_: "Fix my code."
    - _Try_: "@debugger, find the root cause of this memory leak."
2.  **Keep the Socratic Gate Open**: If the AI asks 3 questions, give detailed answers. The quality of the output is linearly proportional to the quality of your discovery.
3.  **Use the Theme Generator Early**: Don't build components with "gray" or "blue". Generate a theme first and use the `--primary` variables.
4.  **Doctor Visits**: Run `achira-wf doctor` once a week to ensure your system and registry are healthy.

---

> **Ready to build?**
> Start with a slash command or simply ask: "Achira, what can we build today?"
