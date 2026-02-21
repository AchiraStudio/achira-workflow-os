import "./AgentCard.css";
import Badge from "./Badge";

const GROUP_INITIALS = {
  Masters: "M",
  Architects: "A",
  Guards: "G",
  Specialists: "S",
};

export default function AgentCard({ agent }) {
  const initial = agent.name.charAt(0).toUpperCase();

  return (
    <div className={`agent-card agent-card--${agent.group.toLowerCase()}`}>
      <div className="agent-card__header">
        <div className={`agent-avatar agent-avatar--${agent.group.toLowerCase()}`}>
          {initial}
        </div>
        <div className="agent-card__meta">
          <h3>{agent.name}</h3>
          <Badge label={agent.group} type="group" />
        </div>
      </div>

      <p className="agent-card__tagline">{agent.tagline}</p>
      <p className="agent-card__desc">{agent.description}</p>

      {agent.skills.length > 0 && (
        <div className="agent-card__skills">
          {agent.skills.slice(0, 4).map((skill) => (
            <span key={skill} className="skill-chip">
              {skill}
            </span>
          ))}
          {agent.skills.length > 4 && (
            <span className="skill-chip skill-chip--more">+{agent.skills.length - 4}</span>
          )}
        </div>
      )}
    </div>
  );
}
