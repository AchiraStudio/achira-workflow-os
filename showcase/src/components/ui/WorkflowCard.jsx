import "./WorkflowCard.css";
import Badge from "./Badge";
import { Terminal } from "lucide-react";

export default function WorkflowCard({ workflow }) {
  return (
    <div className="workflow-card">
      <div className="workflow-card__top">
        <div className="command-tag">
          <Terminal size={14} />
          <span>{workflow.command}</span>
        </div>
        <Badge label={workflow.category} type="category" />
      </div>

      <p className="workflow-card__desc">{workflow.description}</p>

      <div className="workflow-card__example">
        <div className="example-label">Example:</div>
        <code className="example-cmd">{workflow.example}</code>
      </div>
    </div>
  );
}
