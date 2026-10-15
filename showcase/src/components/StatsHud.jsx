import React from "react";
import { Cpu, ShieldCheck, Zap, Workflow, Compass, Terminal, Server, Sparkles } from "lucide-react";

export default function StatsHud() {
  const stats = [
    {
      label: "Modern Engineering Skills",
      value: "54",
      sub: "7 Master Pillars + 47 Domain Skills",
      icon: Cpu,
      color: "text-cyan-400",
      border: "hover:border-cyan-500/40",
      badge: "Full Stack",
    },
    {
      label: "Autonomous Specialist Agents",
      value: "21",
      sub: "Normalized Antigravity Schemas",
      icon: Workflow,
      color: "text-amber-400",
      border: "hover:border-amber-500/40",
      badge: "Delegation Engine",
    },
    {
      label: "Production Workflows",
      value: "25",
      sub: "11 Scaffolds + 14 Slash Commands",
      icon: Terminal,
      color: "text-sky-400",
      border: "hover:border-sky-500/40",
      badge: "v5.0 Engine",
    },
    {
      label: "Machine-Wide Integration",
      value: "Global",
      sub: "Active across all folders & workspaces",
      icon: Server,
      color: "text-emerald-400",
      border: "hover:border-emerald-500/40",
      badge: "LS Verified",
    },
  ];

  return (
    <section className="py-8 border-y border-[#1E293B] bg-slate-950/40">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className={`glass-panel p-5 transition-all duration-300 relative group overflow-hidden ${s.border}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-slate-900 border border-slate-800 ${s.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                    {s.badge}
                  </span>
                </div>
                <div className="text-3xl font-extrabold tracking-tight text-white mb-1 font-mono">
                  {s.value}
                </div>
                <div className="text-sm font-semibold text-slate-200 mb-1">{s.label}</div>
                <div className="text-xs text-slate-500 font-normal leading-relaxed">{s.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

