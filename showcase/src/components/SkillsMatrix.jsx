import React, { useState, useMemo } from "react";
import { Search, Cpu, Check, Copy, ExternalLink, Sparkles, Filter, X } from "lucide-react";
import { skillCategories } from "../data/skills";

export default function SkillsMatrix() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeSkillModal, setActiveSkillModal] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Flatten all skills
  const allSkills = useMemo(() => {
    const list = [];
    skillCategories.forEach((cat) => {
      cat.skills.forEach((s) => {
        list.push({ ...s, category: cat.name });
      });
    });
    return list;
  }, []);

  // Filter skills
  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesCategory =
        selectedCategory === "all" || skill.category === selectedCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        skill.id.toLowerCase().includes(q) ||
        skill.label.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [allSkills, selectedCategory, search]);

  const copySkillTrigger = (skillId) => {
    const trigger = `@[skills/${skillId}]`;
    navigator.clipboard.writeText(trigger);
    setCopiedId(skillId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>SKILLS MATRIX (54 TOTAL)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
              Progressive Engineering Knowledge
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Distilled production runbooks, architectural decision matrices, and zero-slop guidelines loaded on-demand.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 54 skills..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-900/90 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-mono"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            All Skills ({allSkills.length})
          </button>
          {skillCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.name
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {cat.name} ({cat.skills.length})
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="glass-panel p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-200 group cursor-pointer"
              onClick={() => setActiveSkillModal(skill)}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
                    @{skill.id}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {skill.category.split(" ")[0]}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                  {skill.label}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {skill.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono group-hover:text-slate-300 transition-colors">
                  Click for details →
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copySkillTrigger(skill.id);
                  }}
                  className="p-1 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                  title="Copy trigger syntax"
                >
                  {copiedId === skill.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 glass-panel">
            <p className="text-slate-400 text-sm">No skills found matching your search.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
              className="mt-3 px-3 py-1.5 text-xs font-mono rounded bg-slate-800 text-cyan-400 hover:bg-slate-700"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Skill Detail Modal */}
        {activeSkillModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="glass-panel w-full max-w-lg p-6 relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setActiveSkillModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  @{activeSkillModal.id}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {activeSkillModal.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {activeSkillModal.label}
              </h3>

              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 mb-4">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                  Capability Description
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeSkillModal.description}
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="text-slate-500 mb-1">Activation Announcement:</div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-cyan-300 overflow-x-auto">
                    📚 Using skill: @{activeSkillModal.id}...
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 mb-1">Global Storage Path:</div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[11px] overflow-x-auto">
                    ~/.gemini/config/skills/{activeSkillModal.id}/SKILL.md
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => copySkillTrigger(activeSkillModal.id)}
                  className="btn-primary text-xs"
                >
                  {copiedId === activeSkillModal.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-950" />
                      Copied Mention!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy @[skills/{activeSkillModal.id}]
                    </>
                  )}
                </button>
                <button
                  onClick={() => setActiveSkillModal(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

