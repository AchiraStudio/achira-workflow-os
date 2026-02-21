# Achira Workflow OS V4 - Technical Walkthrough

Welcome to the future of agentic engineering. Achira Workflow OS V4 is a massive jump forward in how AI assistants perceive and execute complex software tasks.

By internalizing expert domain knowledge into **Native Skills**, we have created a system that is faster, lighter, and more intelligent than ever before.

---

## 🏗️ 1. The Core Infrastructure

### Native Skill Engine (The 7 Pillars)

We have replaced the external 3,000+ file `awesome-skills` dependency with seven high-density Master Skills. These are located in `.achira/core/skills/` and are automatically loaded by the LLM during specific workflows:

1.  **`web-expert`**: The gold standard for Next.js, React, and Vanilla Web. Covers performance, SEO, and strict TS/JS patterns.
2.  **`app-expert`**: Architectures for Mobile (Flutter/Dart 3) and Desktop (Avalonia/C#), enforcing Clean Architecture and MVVM.
3.  **`game-expert`**: High-performance Unity development focusing on Memory Management (Zero-allocation) and Object Pooling.
4.  **`backend-expert`**: Advanced FastAPI logic, Pydantic v2 validation, and robust Database Schema/RLS design.
5.  **`commerce-expert`**: Specialized logic for Shopify Apps/Themes and secure Stripe payment integrations.
6.  **`ai-expert`**: The blueprint for AI-native software. Covers RAG pipelines, LLM orchestration, and ethical prompt engineering.
7.  **`devops-expert`**: Production-grade engineering. Covers CI/CD automation, multi-stage Docker builds, and Cloud observability.

---

## 🚀 2. Scaffolding Workflows

V4 introduces 10 distinct mission-critical scaffolds. Once your project is initialized, these are available as **Slash Commands** directly in your AI assistant.

### Web & Fullstack

- **`/react`**: Scalable SPA with Service Layer and Vitest.
- **`/next`**: Enterprise App Router setup with Feature-driven folders.
- **`/saas`**: The "Startup in a Box" — Next.js + Supabase + Stripe.
- **`/landing-page`**: SEO-optimized, high-performance marketing foundations.
- **`/html`**: Modernized Vanilla Web with Vite-powered HMR.

### Mobile & Desktop

- **`/flutter`**: Production-ready Dart 3 scaffold with Riverpod state management.
- **`/avalonia`**: Modern C# Desktop architecture using the Zafiro toolkit.

### Specialized

- **`/unity`**: High-performance C# game development foundations.
- **`/python-backend`**: Modern FastAPI setup managed by `uv`.
- **`/database`**: Pure architectural guidance for SQL/NoSQL and Security policies.
- **`/shopify`**: Smart routing for Shopify App, Extension, or Theme development.

---

## 🧠 3. Intelligence Mapping (The Skill Explorer)

Located at the heart of `project-setup/SKILL.md`, the **Skill Explorer** is a routing table that maps every slash command to its required Native Skills. This ensures that when you call `/saas`, the LLM doesn't just "guess" — it explicitly pulls down its internal expert knowledge for Web, Backend, and Commerce simultaneously.

---

## 🤖 4. Intelligence: The AI Specialist

V4.1 introduces the **AI Specialist** agent (`ai-specialist.md`). This persona is specifically designed to:

- Select foundation models based on reasoning vs. latency requirements.
- Build and optimize Vector Search systems (pgvector, Pinecone).
- Guard against prompt injection and oversee token economics.
- Implement specialized AI-native features like semantic search and auto-complete.

---

## ⚒️ 5. CLI Improvements (v4.1.1)

- **Internal Syringe**: The CLI no longer copies thousands of files. It now injects a curated set of 22 workflows and 7 expert Master Skills directly into your project.
- **Self-Healing Doctor**: Enhanced `achira-wf doctor` command checks for both Agent health and Skill validity.
- **Absolute Discovery**: All workflows are automatically synced to `.agent/workflows/` and `.cursorrules` are linked to ensure your IDE assistant never loses track of its mission.

---

## 📈 6. How to Get Started

1.  **Update**: `npm install -g achira-wf`
2.  **Initialize**: `achira-wf init` in your project root.
3.  **Deploy**: Use `/plan` to strategize, then call any scaffold like `/next` or `/saas` to build.

---

> "Stop coding. Start orchestrating." — The Achira Team
