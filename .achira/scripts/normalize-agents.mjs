import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const agentsDir = path.resolve(__dirname, "..", "core", "agents");

function normalizeAgentFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n[\s\S]*)$/);
  if (!match) return;

  const fm = match[1];
  const rest = match[2];

  const lines = fm.split(/\r?\n/);
  let name = "";
  let description = "";
  let model = "inherit";
  let tools = [];
  let skills = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("name:")) {
      name = line.replace("name:", "").trim();
    } else if (line.startsWith("description:")) {
      description = line.replace("description:", "").trim();
    } else if (line.startsWith("model:")) {
      model = line.replace("model:", "").trim();
    } else if (line.startsWith("tools:")) {
      const restTools = line.replace("tools:", "").trim();
      if (restTools) {
        tools = restTools
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    } else if (line.startsWith("skills:")) {
      const restSkills = line.replace("skills:", "").trim();
      if (restSkills) {
        skills = restSkills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }
  }

  const newFm = ["---", `name: ${name}`, `description: ${description}`];
  if (model) newFm.push(`model: ${model}`);
  if (tools.length > 0) {
    newFm.push("tools:");
    tools.forEach((t) => newFm.push(`  - ${t}`));
  }
  if (skills.length > 0) {
    newFm.push("skills:");
    skills.forEach((s) => newFm.push(`  - ${s}`));
  }
  newFm.push("---");

  const newContent = newFm.join("\n") + rest;
  fs.writeFileSync(filePath, newContent, "utf-8");
}

const files = fs.readdirSync(agentsDir).filter((f) => f.endsWith(".md"));
for (const f of files) {
  normalizeAgentFile(path.join(agentsDir, f));
}
console.log(`Successfully normalized ${files.length} agent frontmatters in ${agentsDir}`);

