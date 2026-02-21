import "./Home.css";
import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/ui/SectionHeader";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Zap, Shield, GitBranch, CheckCircle, Sparkles, Layers } from "lucide-react";
import { motion } from "framer-motion";

const STATS = [
  { value: "21", label: "Specialist Agents" },
  { value: "7", label: "Master Pillars" },
  { value: "22", label: "Mission Workflows" },
  { value: "Socratic", label: "Discovery" },
  { value: "~90%", label: "Dev Coverage" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Sparkles,
    title: "Socratic Gate",
    description: "Before generation, the system asks strategic questions about edge cases and true user intent.",
  },
  {
    step: "02",
    icon: GitBranch,
    title: "Blueprint Generation",
    description: "Creates a `blueprint.json` — a logical skeleton to prevent architectural drift before writing code.",
  },
  {
    step: "03",
    icon: Cpu,
    title: "Agent Routing",
    description: "The Orchestrator deploys specialists (Frontend, DB, DevOps) with strict domain boundaries.",
  },
  {
    step: "04",
    icon: Layers,
    title: "Skill Loading",
    description: "Agents dynamically load relevant skill modules on-demand for context-aware execution.",
  },
  {
    step: "05",
    icon: CheckCircle,
    title: "Verification Engine",
    description: "A 4-priority suite runs on every change, demanding a Lighthouse audit before merge.",
  },
];

const PILLARS = [
  {
    icon: Sparkles,
    title: "Socratic Discovery",
    description: "The most expensive line of code is the one that shouldn't have been written.",
    colSpan: 2,
  },
  {
    icon: Zap,
    title: "Premium Design",
    description: "The ui-ux-pro-max skill contains 97 curated color palettes and 57 font pairings.",
    colSpan: 1,
  },
  {
    icon: Shield,
    title: "V4.1 Mission Integrity",
    description: "Speed never comes at the cost of stability. A 7-pillar verification suite gates every deployment.",
    colSpan: 3,
  },
];

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  return (
    <MainLayout>
      <div className="home-container">

        {/* === HERO === */}
        <section className="hero-section">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeUp} className="hero-title">
              Engineering Intelligence.
            </motion.h1>
            
            <motion.p variants={fadeUp} className="hero-subtitle">
              An AI-native operating system for orchestrated, verified execution.
              <span className="live-tag">V4.1 is now live.</span>
            </motion.p>
            
            <motion.div variants={fadeUp} className="hero-actions">
              <Link to="/agents" className="btn-solid btn-large">
                Meet the Agents <ArrowRight size={16} />
              </Link>
              <Link to="/architecture" className="btn-outline btn-large">
                View Architecture
              </Link>
            </motion.div>
          </motion.div>
          <div className="hero-visual" aria-hidden="true">
            <div className="glow-sphere main-sphere"></div>
          </div>
        </section>

        {/* === STATS BAR === */}
        <motion.section 
          className="stats-bar glass-panel"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          {STATS.map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </motion.section>

        {/* === PILLARS (BENTO BOX) === */}
        <section id="pillars" className="pillars-section page-section">
          <SectionHeader
            eyebrow="Core Philosophy"
            title="Unbreakable pillars."
            subtitle="Every decision in Achira OS is a direct expression of these foundational principles."
          />
          <motion.div 
            className="bento-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div 
                  key={i} 
                  className={`bento-card col-span-${pillar.colSpan}`}
                  variants={fadeUp}
                  whileHover={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="bento-icon-wrap">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* === HOW IT WORKS === */}
        <section id="walkthrough" className="walkthrough-section page-section">
          <SectionHeader
            eyebrow="The Workflow"
            title="Concept to production."
            subtitle="From the moment you write a slash command to the final Lighthouse audit — every step is intentional."
          />
          <motion.div 
            className="steps-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i} className="step-row glass-panel" variants={fadeUp}>
                  <div className="step-icon-wrap">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <div className="step-body">
                    <div className="step-header-row">
                      <span className="step-num">{step.step}</span>
                      <h3>{step.title}</h3>
                    </div>
                    <p>{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* === CTA === */}
        <motion.section 
          className="cta-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="cta-inner glass-panel">
            <h2>Ready to explore the OS?</h2>
            <p>Browse all 21 elite agents, view the full 7-pillar architecture, or explore every mission workflow.</p>
            <div className="cta-actions">
              <Link to="/agents" className="btn-solid btn-large">Explore Agents</Link>
              <Link to="/workflows" className="btn-outline btn-large">View Workflows</Link>
            </div>
          </div>
        </motion.section>

      </div>
    </MainLayout>
  );
}
