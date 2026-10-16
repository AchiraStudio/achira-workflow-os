import "./Modal.css";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose }) {
  const [copiedId, setCopiedId] = useState(null);

  const steps = [
    { id: "install", label: "01 // Install Global CLI", command: "npm i -g achira-wf" },
    { id: "init", label: "02 // Sync Project Skills (.agent/skills/)", command: "npx achira-wf init" },
    { id: "global", label: "03 // Enable Machine-Wide Plugin", command: "achira-wf global install" },
  ];

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div
            className="modal-content glass-panel"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>DEPLOY ACHIRA WORKFLOW V5.2</h3>
              <button className="close-btn" onClick={onClose} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-intro">
                Provision 21 specialist agents and 85 modular SKILL.md procedures locally or machine-wide.
              </p>

              <div className="install-steps">
                {steps.map((step) => (
                  <div key={step.id} className="step-item">
                    <span className="step-label">{step.label}</span>
                    <div className="command-box">
                      <code>{step.command}</code>
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(step.command, step.id)}
                        aria-label={`Copy ${step.command}`}
                      >
                        {copiedId === step.id ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-notes">
                <div className="note-item">
                  <span className="note-dot" />
                  <span>Provisions 21 autonomous specialist agents and 85 unified SKILL.md modules.</span>
                </div>
                <div className="note-item">
                  <span className="note-dot" />
                  <span>Registers 25 slash-command & project scaffold skills directly in .agent/skills/.</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-solid w-full" onClick={onClose}>
                CLOSE TERMINAL
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
