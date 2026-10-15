import { describe, it, expect } from "vitest";
import { agents } from "@/data/agents";
import { skills } from "@/data/skills";
import { workflows } from "@/data/workflows";

describe("Achira Workflow V5 Ecosystem", () => {
  it("loads all 21 autonomous specialist agents", () => {
    expect(agents.length).toBe(21);
    const agentIds = agents.map((a) => a.id);
    expect(agentIds).toContain("orchestrator");
    expect(agentIds).toContain("frontend-specialist");
    expect(agentIds).toContain("security-auditor");
    expect(agentIds).toContain("devops-engineer");
  });

  it("loads all 54 modern engineering skills", () => {
    expect(skills.length).toBe(54);
    const skillIds = skills.map((s) => s.id);
    expect(skillIds).toContain("clean-code");
    expect(skillIds).toContain("frontend-design");
    expect(skillIds).toContain("design-spec");
    expect(skillIds).toContain("app-builder");
  });

  it("loads all 25 mission workflows and scaffolds", () => {
    expect(workflows.length).toBe(25);
    const scaffolds = workflows.filter((w) => w.category === "Scaffolding");
    expect(scaffolds.length).toBe(12);
  });
});
