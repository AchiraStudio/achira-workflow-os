import React, { useState } from "react";
import { Terminal, Copy, Check, ArrowRight, Sparkles, Layers, ShieldCheck, Cpu } from "lucide-react";
import v5Icon from "../assets/achira-v5-icon.svg";

export default function Hero({ onExploreSkills, onExploreWorkflows }) {
  const [copiedCmd, setCopiedCmd] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      <div className="container relative z-10 flex flex-col items-center text-center">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-8 backdrop-blur-md">
          <img
            src={v5Icon}
            alt="V5"
            width="14"
            height="14"
            className="w-3.5 h-3.5"
            style={{ width: "14px", height: "14px", flexShrink: 0 }}
          />
          <span className="font-semibold text-white">V5 RELEASE</span>
          <span className="text-cyan-600">•</span>
          <span>GLOBAL ANTIGRAVITY ENGINE</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6">
          Orchestrate <span className="gradient-text-cyan glow-cyan">21 Agents</span>. Deploy <span className="gradient-text-amber">54 Skills</span>.
          <br />
          <span className="text-slate-200">Zero Slop.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-normal">
          Achira Workflow is an enterprise-grade AI software engineering framework built natively for Google Antigravity & Gemini.
          Now accessible machine-wide across every folder and project.
        </p>

        {/* Quickstart Terminal Card */}
        <div className="w-full max-w-xl glass-panel p-4 mb-10 text-left relative overflow-hidden group">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              <span className="text-xs font-mono text-slate-500 ml-2">quickstart.sh</span>
            </div>
            <span className="text-[11px] font-mono text-cyan-400/80">v5.0.0</span>
          </div>

          {/* Commands */}
          <div className="space-y-2.5 font-mono text-xs sm:text-sm">
            {/* Command 1: Global Install */}
            <div className="flex items-center justify-between p-2 rounded bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-2 overflow-x-auto text-slate-300">
                <span className="text-cyan-400 font-bold">$</span>
                <span>npm install -g achira-wf</span>
              </div>
              <button
                onClick={() => copyToClipboard("npm install -g achira-wf", "npm")}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copy command"
              >
                {copiedCmd === "npm" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Command 2: Global Activate */}
            <div className="flex items-center justify-between p-2 rounded bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-2 overflow-x-auto text-slate-300">
                <span className="text-cyan-400 font-bold">$</span>
                <span>achira-wf global install</span>
              </div>
              <button
                onClick={() => copyToClipboard("achira-wf global install", "global")}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copy command"
              >
                {copiedCmd === "global" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 font-mono text-center">
            Instantly enables all 54 skills & 21 agents in Antigravity across all your projects.
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={onExploreSkills} className="btn-primary">
            <Layers className="w-4 h-4" />
            Explore Skills Matrix (54)
            <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={onExploreWorkflows} className="btn-secondary">
            <Terminal className="w-4 h-4 text-cyan-400" />
            Browse 25 Workflows
          </button>
        </div>
      </div>
    </section>
  );
}

