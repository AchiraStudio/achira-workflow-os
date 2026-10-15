import React from "react";
import { Terminal, ShieldCheck, Github, ExternalLink, Zap } from "lucide-react";
import v5Icon from "../assets/achira-v5-icon.svg";

export default function Navbar({ onNavigate, activeSection }) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#070A0F]/80 border-b border-[#1E293B]">
      <div className="container flex items-center justify-between h-16">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate("hero")}>
          <img src={v5Icon} alt="Achira Workflow V5" className="w-8 h-8 drop-shadow-[0_0_12px_rgba(0,242,254,0.35)]" />
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg tracking-tight text-white">Achira Workflow</span>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              V5.0
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => onNavigate("skills")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeSection === "skills" ? "text-cyan-400 bg-cyan-950/40" : "text-slate-400 hover:text-white"
            }`}
          >
            Skills <span className="text-xs text-slate-500 font-mono">54</span>
          </button>
          <button
            onClick={() => onNavigate("workflows")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeSection === "workflows" ? "text-cyan-400 bg-cyan-950/40" : "text-slate-400 hover:text-white"
            }`}
          >
            Workflows <span className="text-xs text-slate-500 font-mono">25</span>
          </button>
          <button
            onClick={() => onNavigate("agents")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeSection === "agents" ? "text-cyan-400 bg-cyan-950/40" : "text-slate-400 hover:text-white"
            }`}
          >
            Agents <span className="text-xs text-slate-500 font-mono">21</span>
          </button>
          <button
            onClick={() => onNavigate("global")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeSection === "global" ? "text-cyan-400 bg-cyan-950/40" : "text-slate-400 hover:text-white"
            }`}
          >
            Global Setup
          </button>
        </nav>

        {/* Status & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Antigravity Active
          </div>

          <a
            href="https://github.com/AchiraStudio/achira-workflow-os"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}

