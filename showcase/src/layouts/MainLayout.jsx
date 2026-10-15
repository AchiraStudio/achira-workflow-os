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
      {/* Floating Precision Navbar */}
      <header className="navbar-wrapper">
        <motion.nav 
          className="minimal-nav"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Brand Identity */}
          <Link to="/" className="brand-link" title="Achira Workflow Home">
            <div className="brand-icon-wrapper">
              <img src="/favicon.svg" alt="Achira Workflow V5" className="brand-icon" />
              <span className="brand-glow-halo" aria-hidden="true" />
            </div>
            <span className="brand-title">Achira Workflow</span>
            <span className="brand-badge">V5.0</span>
          </Link>

          {/* Navigation Links */}
          <div className="nav-links">
            <NavLink to="/architecture" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              Architecture
            </NavLink>
            <NavLink to="/agents" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              Agents
              <span className="nav-count">21</span>
            </NavLink>
            <NavLink to="/workflows" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              Workflows
              <span className="nav-count">25</span>
            </NavLink>
            <a 
              href="https://github.com/AchiraStudio/achira-workflow-os" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link nav-github"
            >
              GitHub
            </a>
          </div>

          {/* Actions */}
          <div className="nav-actions">
            <div className="engine-status" title="Antigravity Engine Active">
              <span className="status-dot" aria-hidden="true" />
              <span className="status-text">Active</span>
            </div>
            <Link to="/workflows" className="btn-nav-guide">Guide</Link>
            <button className="btn-nav-primary" onClick={() => setIsModalOpen(true)}>
              Get Started
            </button>
          </div>
        </motion.nav>
      </header>

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
