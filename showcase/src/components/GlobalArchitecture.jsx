import React, { useState } from "react";
import { Server, ShieldCheck, Terminal, Copy, Check, Globe, FolderGit2, Cpu } from "lucide-react";

export default function GlobalArchitecture() {
  const [copiedCmd, setCopiedCmd] = useState(null);

  const copyCommand = (cmd, id) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const layers = [
    {
      title: "1. Global Antigravity Plugin",
      path: "~/.gemini/config/plugins/achira-workflow-os/",
      description:
        "Full bundle containing 21 normalized agents, 54 skills, rules/AGENTS.md, and hooks.json. Discovered and mounted on language server boot.",
      icon: Server,
      color: "text-cyan-400",
    },
    {
      title: "2. Progressive Skills Engine",
      path: "~/.gemini/config/skills/",
      description:
        "All 54 skills registered directly into the Antigravity global skills directory, available on-demand in any project without context pollution.",
      icon: Cpu,
      color: "text-amber-400",
    },
    {
      title: "3. Universal Machine Rules",
      path: "~/.gemini/GEMINI.md",
      description:
        "Enforces the Achira engineering protocol, anti-slop guidelines, WCAG AA accessibility, and automatic specialist routing everywhere.",
      icon: ShieldCheck,
      color: "text-emerald-400",
    },
    {
      title: "4. Project-Level Scaffolding (Optional)",
      path: "./.achira/ & .agent/workflows/",
      description:
        "Run `achira-wf init` in any repository to unlock IDE slash command auto-completion, project-scoped memory, and PreToolUse safety gates.",
      icon: FolderGit2,
      color: "text-sky-400",
    },
  ];

  return (
    <section id="global" className="py-16 md:py-24 bg-slate-950/60 border-t border-[#1E293B]">
      <div className="container">
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>GLOBAL ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            Machine-Wide Zero Configuration
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Never install or copy rules manually again. One global installation makes every agent and skill accessible across all your projects.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {layers.map((layer, idx) => {
            const Icon = layer.icon;
            return (
              <div key={idx} className="glass-panel p-5 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-slate-900 border border-slate-800 ${layer.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{layer.title}</h3>
                    <code className="text-[11px] text-cyan-400/90 font-mono">{layer.path}</code>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{layer.description}</p>
              </div>
            );
          })}
        </div>

        {/* CLI Command Cheatsheet */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Essential Global CLI Commands
            </h3>
            <span className="text-xs font-mono text-slate-500">achira-wf CLI</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            {[
              { cmd: "achira-wf global install", desc: "Deploy global plugin & skills to ~/.gemini/config/" },
              { cmd: "achira-wf global doctor", desc: "Validate health of machine-wide integration & LS" },
              { cmd: "achira-wf global sync", desc: "Re-sync latest skills & agents from repo" },
              { cmd: "achira-wf init", desc: "Scaffold local workflows and memory in current project" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all"
              >
                <div>
                  <div className="text-cyan-300 font-semibold mb-0.5">{item.cmd}</div>
                  <div className="text-[11px] text-slate-500 font-sans">{item.desc}</div>
                </div>
                <button
                  onClick={() => copyCommand(item.cmd, idx)}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Copy command"
                >
                  {copiedCmd === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

