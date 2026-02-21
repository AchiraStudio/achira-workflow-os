import "./Badge.css";

const GROUP_COLORS = {
  Masters: "badge-gold",
  Architects: "badge-blue",
  Guards: "badge-red",
  Specialists: "badge-teal",
};

const CATEGORY_COLORS = {
  Discovery: "badge-teal",
  Scaffolding: "badge-blue",
  Development: "badge-blue",
  Quality: "badge-red",
  Design: "badge-gold",
  Operations: "badge-muted",
  Advanced: "badge-gold",
};

export default function Badge({ label, type = "group" }) {
  const colorClass =
    type === "group"
      ? GROUP_COLORS[label] || "badge-muted"
      : CATEGORY_COLORS[label] || "badge-muted";

  return <span className={`badge ${colorClass}`}>{label}</span>;
}
