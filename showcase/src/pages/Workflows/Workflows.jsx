import "./Workflows.css";
import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/ui/SectionHeader";
import WorkflowCard from "@/components/ui/WorkflowCard";
import { workflows, workflowCategories } from "@/data/workflows";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }
};

export default function WorkflowsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? workflows
      : workflows.filter((w) => w.category === activeCategory);

  return (
    <MainLayout>
      <div className="workflows-container page-container">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <SectionHeader
            eyebrow="Slash Commands & Scaffolds"
            title="Built for velocity."
            subtitle="Every workflow is a precise, step-by-step procedure that agents follow. No improvisation — structured execution every time."
          />
        </motion.div>

        {/* Terminal intro block */}
        <motion.div 
          className="terminal-intro glass-panel"
          initial="hidden" animate="visible" variants={fadeUp}
        >
          <div className="terminal-bar">
            <span className="dot dot-close" aria-hidden="true"></span>
            <span className="dot dot-min" aria-hidden="true"></span>
            <span className="dot dot-max" aria-hidden="true"></span>
            <span className="terminal-title-label">root@achira-os ~ /workflows</span>
          </div>
          <div className="terminal-body">
            <p><span className="prompt">$</span> achira-wf list</p>
            <p className="out muted">Querying workflow registry...</p>
            <p className="out success">Found 22 registered workflows. 21 agents on standby.</p>
            <p className="out"><span className="key">Tip:</span> Use a slash command in your IDE to invoke any workflow.</p>
            <p className="cursor">█</p>
          </div>
        </motion.div>

        {/* Category filter */}
        <motion.div className="filter-tabs" initial="hidden" animate="visible" variants={fadeUp}>
          {workflowCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="workflows-grid">
          <AnimatePresence>
            {filtered.map((wf) => (
              <motion.div 
                key={wf.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              >
                <WorkflowCard workflow={wf} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </MainLayout>
  );
}
