import "./MainLayout.css";
import { NavLink, Link } from "react-router-dom";
import { Layers } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "@/components/ui/Modal";

export default function MainLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="layout-container">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Floating Nano Navbar */}
      <motion.nav 
        className="minimal-nav glass-panel"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="brand-wrapper">
          <Link to="/" className="brand-logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="/favicon.svg" alt="Achira Workflow V5" style={{ width: "24px", height: "24px" }} />
            <span style={{ fontWeight: 800 }}>Achira Workflow</span>
            <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 6px", borderRadius: "9999px", background: "rgba(0, 242, 254, 0.12)", color: "#00F2FE", border: "1px solid rgba(0, 242, 254, 0.3)" }}>V5.0</span>
          </Link>
        </div>

        <div className="nav-links">
          <NavLink to="/architecture" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Architecture
          </NavLink>
          <NavLink to="/agents" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Agents
          </NavLink>
          <NavLink to="/workflows" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Workflows
          </NavLink>
          <a href="https://github.com/AchiraStudio/achira-workflow-os" target="_blank" rel="noopener noreferrer" className="nav-link">
            Repository
          </a>
        </div>

        <div className="nav-actions">
          <Link to="/workflows" className="btn-outline">Guide</Link>
          <button className="btn-solid" onClick={() => setIsModalOpen(true)}>Get Started</button>
        </div>
      </motion.nav>

      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="minimal-footer">
        <div className="footer-content">
          <div className="footer-brand" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src="/favicon.svg" alt="Achira Workflow V5" style={{ width: "20px", height: "20px" }} />
            <span className="footer-title">Achira Workflow V5.0</span>
          </div>
          <p className="footer-tagline">The premier multi-agent orchestration framework for AI-native software engineering.</p>
          <div className="footer-links">
            <Link to="/architecture">Architecture</Link>
            <Link to="/agents">Agents</Link>
            <Link to="/workflows">Workflows</Link>
            <a href="https://github.com/AchiraStudio/achira-workflow-os" target="_blank" rel="noopener noreferrer">Repository</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
