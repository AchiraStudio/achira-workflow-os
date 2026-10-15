import React from "react";
import { Github, ExternalLink, Heart, Shield, Terminal } from "lucide-react";
import v5Icon from "../assets/achira-v5-icon.svg";

export default function Footer() {
  return (
    <footer className="border-t border-[#1E293B] bg-[#05070B] py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <img
              src={v5Icon}
              alt="Achira Workflow"
              width="28"
              height="28"
              className="w-7 h-7"
              style={{ width: "28px", height: "28px", flexShrink: 0 }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white tracking-tight">Achira Workflow</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  V5.0
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Multi-agent engineering framework for Google Antigravity & Gemini.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <a
              href="https://github.com/AchiraStudio/achira-workflow-os"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Repository
            </a>
            <span>•</span>
            <a
              href="https://www.npmjs.com/package/achira-wf"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              npm: achira-wf
            </a>
            <span>•</span>
            <span className="text-slate-600">MIT License</span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 font-mono gap-2">
          <div>
            Built with strict anti-slop engineering standards. Zero generic AI slop.
          </div>
          <div>
            © {new Date().getFullYear()} Achira Studio. Designed for Antigravity Pair Programming.
          </div>
        </div>
      </div>
    </footer>
  );
}
