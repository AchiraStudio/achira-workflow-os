import "./SectionHeader.css";

export default function SectionHeader({ eyebrow, title, subtitle, centered = true }) {
  return (
    <div className={`section-header-block ${centered ? "centered" : ""}`}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
