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
          <Link to="/" className="brand-logo">
            <Layers className="logo-icon" size={20} strokeWidth={2} />
            <span>Achira OS</span>
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
          <div className="footer-brand">
            <Layers size={18} strokeWidth={1.5} className="footer-logo" />
            <span className="footer-title">Achira OS V3</span>
          </div>
          <p className="footer-tagline">The blueprint for AI-native software engineering.</p>
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
