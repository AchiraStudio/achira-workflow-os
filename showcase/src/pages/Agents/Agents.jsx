import "./Agents.css";
import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/ui/SectionHeader";
import AgentCard from "@/components/ui/AgentCard";
import { agents, AGENT_GROUPS } from "@/data/agents";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FILTERS = ["All", ...Object.values(AGENT_GROUPS)];

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

export default function AgentsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All" ? agents : agents.filter((a) => a.group === activeFilter);

  return (
    <MainLayout>
      <div className="agents-container page-container">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <SectionHeader
            eyebrow="The Elite Team"
            title="20 Specialist Agents."
            subtitle="Each persona has a strict domain boundary, a set of trigger keywords, and a curated skill stack it loads on-demand."
          />
        </motion.div>

        {/* Summary stats */}
        <motion.div 
          className="agent-summary"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          {Object.values(AGENT_GROUPS).map((group) => (
            <motion.div key={group} className={`summary-item summary-${group.toLowerCase()}`} variants={fadeUp}>
              <span className="summary-count">
                {agents.filter((a) => a.group === group).length}
              </span>
              <span className="summary-label">{group}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter tabs */}
        <motion.div className="filter-tabs" initial="hidden" animate="visible" variants={fadeUp}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-tab ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="agents-grid">
          <AnimatePresence>
            {filtered.map((agent) => (
              <motion.div 
                key={agent.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              >
                <AgentCard agent={agent} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </MainLayout>
  );
}
