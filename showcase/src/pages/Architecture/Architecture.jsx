import "./Architecture.css";
import MainLayout from "@/layouts/MainLayout";
import SectionHeader from "@/components/ui/SectionHeader";
import { skillCategories } from "@/data/skills";
import { Folder, FileText, Cpu, Wrench, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

const DIRECTORY_TREE = [
  {
    name: ".achira/",
    icon: Folder,
    description: "Root of the Agentic OS.",
    children: [
      {
        name: "core/",
        icon: Folder,
        description: "The brain — agents, skills, shared data.",
        children: [
          { name: "agents/", icon: Cpu, description: "20 specialist AI persona definitions." },
          { name: "skills/", icon: Zap, description: "38 domain-specific knowledge modules." },
          { name: "shared/", icon: Folder, description: "Shared data: ui-ux-pro-max datasets..." },
        ],
      },
      {
        name: "workflows/",
        icon: Folder,
        description: "22 slash command procedures + registry.",
        children: [
          { name: "registry.json", icon: FileText, description: "Discovery map." },
          { name: "*.md", icon: FileText, description: "Workflow procedures." },
        ],
      },
      {
        name: "scripts/",
        icon: Wrench,
        description: "Master validation & verification scripts.",
        children: [
          { name: "checklist.py", icon: FileText, description: "Validation gates." },
          { name: "verify_all.py", icon: FileText, description: "Full verification suite." },
        ],
      },
      {
        name: "rules/",
        icon: Shield,
        description: "Global AI constraints.",
        children: [
          { name: "GEMINI.md", icon: FileText, description: "Master rules." },
        ],
      },
      { name: "ARCHITECTURE.md", icon: FileText, description: "Living system map." },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

function TreeNode({ node, depth = 0 }) {
  const Icon = node.icon;
  return (
    <motion.div variants={fadeUp} className={`tree-node depth-${Math.min(depth, 2)}`}>
      <div className="tree-node__row">
        <div className="tree-node__indent" style={{ width: `${depth * 20}px` }} aria-hidden="true" />
        <Icon size={16} strokeWidth={1.5} className="tree-icon" />
        <span className="tree-name">{node.name}</span>
        {node.description && <span className="tree-desc">{node.description}</span>}
      </div>
      {node.children && (
        <div className="tree-children">
          {node.children.map((child) => (
            <TreeNode key={child.name} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function ArchitecturePage() {
  return (
    <MainLayout>
      <div className="arch-container page-container">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <SectionHeader
            eyebrow="System Anatomy"
            title="The .achira/ Core."
            subtitle="Every component of the OS lives inside .achira — a modular directory you install into any project with a single CLI command."
          />
        </motion.div>

        <div className="arch-layout">
          {/* Left Column: System Map & Standards */}
          <div className="arch-column">
            <motion.div 
              className="tree-panel glass-card"
              initial="hidden" animate="visible" variants={staggerContainer}
            >
              <p className="panel-title">Directory Structure</p>
              {DIRECTORY_TREE.map((node) => (
                <TreeNode key={node.name} node={node} depth={0} />
              ))}
            </motion.div>

            <motion.div 
              className="skills-left-stack"
              initial="hidden" animate="visible" variants={staggerContainer}
            >
              {[
                skillCategories.find(c => c.name === "DevOps & Cloud"),
                skillCategories.find(c => c.name === "Platform Skills"),
                skillCategories.find(c => c.name === "Standards")
              ].filter(Boolean).map((cat) => (
                <motion.div key={cat.name} className="skill-category glass-card secondary-skill" variants={fadeUp}>
                  <h3 className="skill-cat-name">{cat.name}</h3>
                  <div className="skill-list">
                    {cat.skills.map((skill) => (
                      <div key={skill.id} className="skill-row" title={skill.description}>
                        <span className="skill-dot" aria-hidden="true" />
                        <span className="skill-label">{skill.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Technical Implementation */}
          <motion.div 
            className="skills-panel"
            initial="hidden" animate="visible" variants={staggerContainer}
          >
            <p className="panel-title">Technical Domains</p>
            <div className="skills-categories">
              {skillCategories.filter(c => 
                !["DevOps & Cloud", "Platform Skills", "Standards"].includes(c.name)
              ).map((cat) => (
                <motion.div key={cat.name} className="skill-category glass-card" variants={fadeUp}>
                  <h3 className="skill-cat-name">{cat.name}</h3>
                  <div className="skill-list">
                    {cat.skills.map((skill) => (
                      <div key={skill.id} className="skill-row" title={skill.description}>
                        <span className="skill-dot" aria-hidden="true" />
                        <span className="skill-label">{skill.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Install Banner */}
        <motion.div 
          className="install-banner glass-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="install-text">
            <h3>Install Achira OS.</h3>
            <p>One command provisions the entire local intelligence directory.</p>
          </div>
          <div className="install-cmd-block">
            <div className="install-cmd-line">
              <span className="install-prompt">$</span>
              <code>npm i achira-wf</code>
            </div>
            <div className="install-cmd-line">
              <span className="install-prompt">$</span>
              <code>npx achira-wf init</code>
            </div>
          </div>
        </motion.div>

      </div>
    </MainLayout>
  );
}
