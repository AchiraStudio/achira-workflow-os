import "./WorkflowCard.css";
import Badge from "./Badge";
import { Terminal, FileCode2 } from "lucide-react";

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

      {workflow.path && (
        <div className="workflow-card__path">
          <FileCode2 size={13} />
          <code>{workflow.path}</code>
        </div>
      )}

      <p className="workflow-card__desc">{workflow.description}</p>

      <div className="workflow-card__example">
        <div className="example-row">
          <span className="example-label">INVOKE</span>
          {workflow.output && <span className="example-output">{workflow.output}</span>}
        </div>
        <code className="example-cmd">{workflow.example}</code>
      </div>
    </div>
  );
}
