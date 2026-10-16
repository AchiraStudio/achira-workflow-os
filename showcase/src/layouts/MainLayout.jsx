import "./MainLayout.css";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";

export default function MainLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="layout-container">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Sleek Floating Navbar (Clean 14px radius, not an extreme pill) */}
      <header className="navbar-wrapper">
        <motion.nav
          className="minimal-nav"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Main Navigation"
        >
          {/* Brand Identity */}
          <Link to="/" className="brand-link" title="Achira Workflow Home" onClick={closeMenu}>
            <div className="brand-icon-wrapper">
              <img src="/favicon.svg" alt="Achira Workflow" className="brand-icon" />
              <span className="brand-glow-halo" aria-hidden="true" />
            </div>
            <span className="brand-title">Achira Workflow</span>
          </Link>

          {/* Navigation Links (Desktop) */}
          <div className="nav-links">
            <NavLink to="/architecture" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              Architecture
            </NavLink>
            <NavLink to="/agents" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              Agents
              <span className="nav-count">21</span>
            </NavLink>
            <NavLink to="/skills" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              Skills
              <span className="nav-count">85</span>
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
            <Link to="/skills" className="btn-nav-guide">
              Skills
            </Link>
            <button className="btn-nav-primary" onClick={() => setIsModalOpen(true)}>
              Get Started
            </button>
            <button
              type="button"
              className="btn-mobile-toggle"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                className="mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeMenu}
                aria-hidden="true"
              />
              <motion.div
                className="mobile-drawer"
                role="dialog"
                aria-label="Mobile Navigation"
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mobile-drawer-links">
                  <NavLink
                    to="/architecture"
                    className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
                    onClick={closeMenu}
                  >
                    <span>Architecture</span>
                  </NavLink>
                  <NavLink
                    to="/agents"
                    className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
                    onClick={closeMenu}
                  >
                    <span>Specialist Agents</span>
                    <span className="nav-count">21</span>
                  </NavLink>
                  <NavLink
                    to="/skills"
                    className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
                    onClick={closeMenu}
                  >
                    <span>Unified Skills & Scaffolds</span>
                    <span className="nav-count">85</span>
                  </NavLink>
                  <a
                    href="https://github.com/AchiraStudio/achira-workflow-os"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-nav-link"
                    onClick={closeMenu}
                  >
                    <span>GitHub Repository</span>
                    <ArrowUpRight size={16} className="mobile-ext-icon" />
                  </a>
                </div>
                <div className="mobile-drawer-actions">
                  <Link to="/skills" className="btn-mobile-secondary" onClick={closeMenu}>
                    Skills
                  </Link>
                  <button
                    className="btn-mobile-primary"
                    onClick={() => {
                      closeMenu();
                      setIsModalOpen(true);
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <main className="main-content">{children}</main>

      {/* Footer */}
      <footer className="minimal-footer">
        <div className="footer-content">
          <div className="footer-brand" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src="/favicon.svg" alt="Achira Workflow V5.2" style={{ width: "20px", height: "20px" }} />
            <span className="footer-title">Achira Workflow V5.2</span>
          </div>
          <p className="footer-tagline">
            The premier multi-agent orchestration framework for AI-native software engineering.
          </p>
          <div className="footer-links">
            <Link to="/architecture">Architecture</Link>
            <Link to="/agents">Agents</Link>
            <Link to="/skills">Skills</Link>
            <a href="https://github.com/AchiraStudio/achira-workflow-os" target="_blank" rel="noopener noreferrer">
              Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
