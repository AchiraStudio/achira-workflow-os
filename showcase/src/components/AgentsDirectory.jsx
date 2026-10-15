import React from "react";
import { Users, Shield, Cpu, Code2, Search, ArrowRight } from "lucide-react";

export default function AgentsDirectory() {
  const agentSquads = [
    {
      squad: "The Strategists",
      color: "border-cyan-500/30 text-cyan-400",
      description: "High-level architectural planning, product requirements, and AI strategy.",
      agents: [
        { name: "orchestrator", role: "Squad Coordinator", desc: "Coordinates cross-domain specialists and synthesizes complex multi-agent workflows." },
        { name: "project-planner", role: "Planning Lead", desc: "4-phase task blueprinting and dependency mapping before any code execution." },
        { name: "product-owner", role: "Vision & Value", desc: "Aligns business targets, user stories, and acceptance criteria." },
        { name: "product-manager", role: "Scope & Specs", desc: "Defines feature boundaries and eliminates ambiguity." },
        { name: "ai-specialist", role: "AI & ML Architect", desc: "RAG pipelines, vector chunking, and deterministic LLM integration." },
      ],
    },
    {
      squad: "The Builders",
      color: "border-sky-500/30 text-sky-400",
      description: "Production software construction across Web, Backend, Mobile, and Gaming.",
      agents: [
        { name: "frontend-specialist", role: "UI/UX Virtuoso", desc: "Design-spec tokens, accessible React 19/Next.js 15, and strict anti-slop rules." },
        { name: "backend-specialist", role: "API & Architecture", desc: "FastAPI, Node.js, microservices, and secure endpoint contracts." },
        { name: "mobile-developer", role: "Mobile Architect", desc: "Clean architecture for Flutter/Dart 3 and React Native cross-platform apps." },
        { name: "game-developer", role: "Game Engine Expert", desc: "Zero-allocation memory patterns in Unity 6 C# and WebGL/Three.js." },
      ],
    },
    {
      squad: "The Sentinels",
      color: "border-amber-500/30 text-amber-400",
      description: "Defensive and offensive cybersecurity, automated testing, and crash resolution.",
      agents: [
        { name: "security-auditor", role: "Zero Trust Defense", desc: "OWASP 2025 compliance, supply chain auditing, and vulnerability prevention." },
        { name: "penetration-tester", role: "Offensive Security", desc: "Attack surface mapping and simulated penetration vectors." },
        { name: "qa-automation-engineer", role: "E2E & Pipelines", desc: "Playwright automation, breaking edge cases, and CI reliability." },
        { name: "test-engineer", role: "TDD & Coverage", desc: "AAA pattern unit/integration test suites and mock isolation." },
        { name: "debugger", role: "Root Cause Analyst", desc: "Systematic 4-phase evidence gathering rejecting trial-and-error." },
      ],
    },
    {
      squad: "The Analysts & Specialists",
      color: "border-emerald-500/30 text-emerald-400",
      description: "Data modeling, performance optimization, DevOps infrastructure, and SEO.",
      agents: [
        { name: "database-architect", role: "Data Modeler", desc: "Schema normalization, index strategy, and Supabase RLS policies." },
        { name: "performance-optimizer", role: "Core Web Vitals", desc: "Eliminating waterfalls, bundle shrinking, and runtime profiling." },
        { name: "devops-engineer", role: "Infra & Safety", desc: "5-phase deployments, containerization, and rollback runbooks." },
        { name: "code-archaeologist", role: "Legacy Modernizer", desc: "Refactoring undocumented code and spaghetti debt." },
        { name: "seo-specialist", role: "Search & GEO", desc: "Google algorithms and Generative Engine Optimization for AI search." },
        { name: "documentation-writer", role: "Technical Scribe", desc: "High-density API documentation and architectural walk-throughs." },
        { name: "explorer-agent", role: "Codebase Discovery", desc: "Deep structural analysis and file dependency mapping." },
      ],
    },
  ];

  return (
    <section id="agents" className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>21 SPECIALIST AGENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            The Autonomous Task Force
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Each agent possesses specialized skills, tools, and strict anti-slop guidelines.
            Automatically routed by domain expertise.
          </p>
        </div>

        <div className="space-y-8">
          {agentSquads.map((squad, sIdx) => (
            <div key={sIdx} className="glass-panel p-6 border-l-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
                <div>
                  <h3 className={`text-lg font-bold ${squad.color.split(" ")[1]}`}>
                    {squad.squad}
                  </h3>
                  <p className="text-xs text-slate-400">{squad.description}</p>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {squad.agents.length} Agents
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {squad.agents.map((agent) => (
                  <div
                    key={agent.name}
                    className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-bold text-cyan-300">
                        @{agent.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {agent.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {agent.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

