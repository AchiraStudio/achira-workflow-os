import React, { useState, useMemo } from "react";
import { Terminal, Copy, Check, Sparkles, Search, Layers, ArrowUpRight, Zap } from "lucide-react";
import { workflows } from "../data/workflows";

export default function WorkflowsExplorer() {
  const [activeTab, setActiveTab] = useState("scaffolds"); // "scaffolds" | "commands"
  const [search, setSearch] = useState("");
  const [copiedCmd, setCopiedCmd] = useState(null);

  const scaffolds = useMemo(() => workflows.filter((w) => w.type === "scaffold"), []);
  const commands = useMemo(() => workflows.filter((w) => w.type === "command"), []);

  const currentList = activeTab === "scaffolds" ? scaffolds : commands;

  const filteredList = useMemo(() => {
    const q = search.toLowerCase();
    return currentList.filter(
      (w) =>
        w.command.toLowerCase().includes(q) ||
        w.name.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        (w.tags && w.tags.some((t) => t.toLowerCase().includes(q))),
    );
  }, [currentList, search]);

  const copyCommand = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section id="workflows" className="py-16 md:py-24 bg-slate-950/60 border-t border-[#1E293B]">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>WORKFLOWS ENGINE (25 TOTAL)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
              Mission-Critical Workflows & Scaffolds
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              From enterprise full-stack scaffolding to systematic debugging and multi-agent coordination.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${activeTab === "scaffolds" ? "11 scaffolds..." : "14 commands..."}`}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-900/90 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-mono"
            />
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
          <button
            onClick={() => {
              setActiveTab("scaffolds");
              setSearch("");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "scaffolds"
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            Project Scaffolds ({scaffolds.length})
          </button>
          <button
            onClick={() => {
              setActiveTab("commands");
              setSearch("");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "commands"
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Terminal className="w-4 h-4" />
            Operational Slash Commands ({commands.length})
          </button>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((wf) => {
            const isNew = ["/coordinate", "/remember", "/verify"].includes(wf.command);
            return (
              <div
                key={wf.command}
                className="glass-panel p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-sm font-mono font-bold px-2.5 py-1 rounded-md bg-slate-900 border border-cyan-500/20 text-cyan-300 group-hover:border-cyan-500/40 transition-colors">
                      {wf.command}
                    </span>

                    {isNew && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        NEW in V5
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {wf.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {wf.description}
                  </p>

                  {/* Tags */}
                  {wf.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {wf.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-slate-400 border border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    CLI: achira-wf create {wf.command.replace("/", "")}
                  </span>
                  <button
                    onClick={() => copyCommand(wf.command)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-xs font-mono text-cyan-400 border border-slate-800 hover:border-cyan-500/30 transition-all"
                    title="Copy command"
                  >
                    {copiedCmd === wf.command ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

