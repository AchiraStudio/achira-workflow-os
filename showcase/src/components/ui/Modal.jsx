import "./Modal.css";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose }) {
  const [copiedId, setCopiedId] = useState(null);
  
  const steps = [
    { id: 'install', label: '1. Install CLI', command: 'npm i achira-wf' },
    { id: 'init', label: '2. Initialize OS', command: 'npx achira-wf init' }
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Get Started with Achira</h3>
              <button className="close-btn" onClick={onClose}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <p className="modal-intro">Follow these steps to deploy the Agentic OS in your environment.</p>
              
              <div className="install-steps">
                {steps.map((step) => (
                  <div key={step.id} className="step-item">
                    <span className="step-label">{step.label}</span>
                    <div className="command-box">
                      <code>{step.command}</code>
                      <button className="copy-btn" onClick={() => copyToClipboard(step.command, step.id)}>
                        {copiedId === step.id ? <Check size={18} className="text-success" /> : <Copy size={18} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-notes">
                <div className="note-item">
                  <span className="note-dot" />
                  <span>Provisions 20 agents and 38 skill modules.</span>
                </div>
                <div className="note-item">
                  <span className="note-dot" />
                  <span>Configures all 14 slash command workflows.</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-solid w-full" onClick={onClose}>Done</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
