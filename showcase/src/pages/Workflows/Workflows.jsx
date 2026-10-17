import "./Workflows.css";
import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/ui/SectionHeader";
import WorkflowCard from "@/components/ui/WorkflowCard";
import { commandSkills, commandSkillCategories, coreSkills } from "@/data/skills";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

const ALL_CATEGORIES = [...commandSkillCategories, "Core Skills (60)"];

export default function WorkflowsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const isCoreCategory = activeCategory === "Core Skills (60)";

  const filteredCommands =
    activeCategory === "All"
      ? commandSkills
      : isCoreCategory
      ? []
      : commandSkills.filter((s) => s.category === activeCategory);

  return (
    <MainLayout>
      <div className="workflows-container page-container">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <SectionHeader
            eyebrow="85 Unified Skills & Scaffolds"
            title="Modular by Design."
            subtitle="Legacy workflows are fully migrated. Every capability now runs as a first-class SKILL.md specification with slash-command execution."
          />
        </motion.div>

        {/* Terminal intro block */}
        <motion.div className="terminal-intro glass-panel" initial="hidden" animate="visible" variants={fadeUp}>
          <div className="terminal-bar">
            <span className="dot dot-close" aria-hidden="true"></span>
            <span className="dot dot-min" aria-hidden="true"></span>
            <span className="dot dot-max" aria-hidden="true"></span>
            <span className="terminal-title-label">achira@engine ~ .agent/skills/</span>
          </div>
          <div className="terminal-body">
            <p>
              <span className="prompt">$</span> achira-wf list
            </p>
            <p className="out muted">Querying unified skill registry (.agent/registry.json)...</p>
            <p className="out success">
              Active: 85 unified skills (25 slash-command & scaffold skills + 60 core engineering skills).
            </p>
            <p className="out">
              <span className="key">Tip:</span> Type slash commands (e.g. /orchestrate, /saas, /ui-ux-pro-max) directly in Antigravity chat.
            </p>
            <p className="cursor">█</p>
          </div>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div className="filter-tabs" initial="hidden" animate="visible" variants={fadeUp}>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Command & Scaffold Skills Grid */}
        {!isCoreCategory && (
          <motion.div layout className="workflows-grid">
            <AnimatePresence>
              {filteredCommands.map((skill) => (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <WorkflowCard workflow={skill} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Core Domain Skills Matrix */}
        {isCoreCategory && (
          <motion.div
            layout
            className="core-skills-matrix"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {coreSkills.map((cs) => (
              <div key={cs.id} className="core-skill-card glass-panel">
                <div className="core-skill-top">
                  <span className="core-skill-id">{cs.id}</span>
                  <span className="core-skill-label">{cs.label}</span>
                </div>
                <p className="core-skill-desc">{cs.description}</p>
                <div className="core-skill-path">
                  <code>.agent/skills/{cs.id}/SKILL.md</code>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
