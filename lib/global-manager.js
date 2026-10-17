import fs from "fs-extra";
import path from "path";
import os from "os";
import http from "http";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getGlobalPaths() {
  const geminiDir = path.join(os.homedir(), ".gemini");
  const configDir = path.join(geminiDir, "config");
  const configJsonPath = path.join(configDir, "config.json");
  const pluginsDir = path.join(configDir, "plugins");
  const pluginTargetDir = path.join(pluginsDir, "achira-workflow-os");
  const configSkillsDir = path.join(configDir, "skills");
  const configAgentsDir = path.join(configDir, "agents");
  const geminiSkillsDir = path.join(geminiDir, "skills");
  const geminiMdPath = path.join(geminiDir, "GEMINI.md");
  const ideDir = path.join(geminiDir, "antigravity-ide");
  const idePluginTargetDir = path.join(ideDir, "plugins", "achira-workflow-os");
  const ideSkillsDir = path.join(ideDir, "skills");

  return {
    geminiDir,
    configDir,
    configJsonPath,
    pluginsDir,
    pluginTargetDir,
    configSkillsDir,
    configAgentsDir,
    geminiSkillsDir,
    geminiMdPath,
    ideDir,
    idePluginTargetDir,
    ideSkillsDir,
  };
}

export async function ensurePluginEnabledInConfig(enabled = true) {
  const { configDir, configJsonPath } = getGlobalPaths();
  try {
    await fs.ensureDir(configDir);
    let cfg = {};
    if (fs.existsSync(configJsonPath)) {
      cfg = await fs.readJson(configJsonPath);
    }
    if (!cfg || typeof cfg !== "object") cfg = {};
    if (!cfg.plugins || typeof cfg.plugins !== "object") cfg.plugins = {};
    cfg.plugins["achira-workflow-os"] = {
      ...(cfg.plugins["achira-workflow-os"] || {}),
      enabled: Boolean(enabled),
    };
    await fs.writeJson(configJsonPath, cfg, { spaces: 2 });
    return true;
  } catch {
    return false;
  }
}

export async function notifyAntigravityLS(enabled = true) {
  const address = process.env.ANTIGRAVITY_LS_ADDRESS;
  const token = process.env.ANTIGRAVITY_CSRF_TOKEN;
  if (!address || !token) {
    await ensurePluginEnabledInConfig(enabled);
    return { notified: false, reason: "LS environment variables not present" };
  }

  const [host, portStr] = address.split(":");
  const port = parseInt(portStr || "5387", 10);
  const body = JSON.stringify({
    userConfig: {
      plugins: {
        "achira-workflow-os": {
          enabled: Boolean(enabled),
        },
      },
    },
  });

  return new Promise((resolve) => {
    const req = http.request(
      {
        host,
        port,
        path: "/exa.language_server_pb.LanguageServerService/JetboxWriteState",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-codeium-csrf-token": token,
          "Content-Length": Buffer.byteLength(body),
        },
        timeout: 3000,
      },
      async (res) => {
        if (res.statusCode !== 200) {
          await ensurePluginEnabledInConfig(enabled);
        }
        resolve({ notified: res.statusCode === 200, statusCode: res.statusCode });
      },
    );

    req.on("error", async (err) => {
      await ensurePluginEnabledInConfig(enabled);
      resolve({ notified: false, reason: err.message });
    });

    req.on("timeout", async () => {
      req.destroy();
      await ensurePluginEnabledInConfig(enabled);
      resolve({ notified: false, reason: "Request timed out" });
    });

    req.write(body);
    req.end();
  });
}

export function generateAgentsRuleMarkdown(baseDir) {
  const universalRulesPath = path.join(baseDir, "rules", "universal-rules.md");
  const coreProtocolPath = path.join(baseDir, "rules", "core-protocol.md");
  const codeRulesPath = path.join(baseDir, "rules", "code-rules.md");
  const designRulesPath = path.join(baseDir, "rules", "design-rules.md");
  const requestRoutingPath = path.join(baseDir, "rules", "request-routing.md");
  const quickRefPath = path.join(baseDir, "rules", "quick-reference.md");

  const stripFrontmatter = (content) => {
    return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "").trim();
  };

  const sections = [
    `# Achira Workflow V5.2 — Global Agent Instructions\n\n> Universal multi-agent orchestration, anti-slop guidelines, modular skill loading, and production-grade software engineering protocol for Google Antigravity & Gemini.\n`,
  ];

  if (fs.existsSync(coreProtocolPath)) {
    sections.push(stripFrontmatter(fs.readFileSync(coreProtocolPath, "utf-8")));
  }
  if (fs.existsSync(requestRoutingPath)) {
    sections.push(stripFrontmatter(fs.readFileSync(requestRoutingPath, "utf-8")));
  }
  if (fs.existsSync(universalRulesPath)) {
    sections.push(stripFrontmatter(fs.readFileSync(universalRulesPath, "utf-8")));
  }
  if (fs.existsSync(codeRulesPath)) {
    sections.push(stripFrontmatter(fs.readFileSync(codeRulesPath, "utf-8")));
  }
  if (fs.existsSync(designRulesPath)) {
    sections.push(stripFrontmatter(fs.readFileSync(designRulesPath, "utf-8")));
  }
  if (fs.existsSync(quickRefPath)) {
    sections.push(stripFrontmatter(fs.readFileSync(quickRefPath, "utf-8")));
  }

  return sections.join("\n\n---\n\n");
}

export async function installGlobal({ baseDir } = {}) {
  const paths = getGlobalPaths();
  const agentSrc = baseDir || path.resolve(__dirname, "..", ".agent");

  if (!fs.existsSync(agentSrc)) {
    throw new Error(`Achira source directory not found at ${agentSrc}`);
  }

  const agentsSrc = path.join(agentSrc, "agents");
  const skillsSrc = path.join(agentSrc, "skills");
  const hooksDirSrc = path.join(agentSrc, "hooks");
  const mcpSrc = path.join(agentSrc, "mcp_config.json");

  // 1. Ensure target dirs
  await fs.ensureDir(paths.pluginsDir);
  await fs.ensureDir(paths.pluginTargetDir);
  await fs.ensureDir(paths.configSkillsDir);
  await fs.ensureDir(paths.configAgentsDir);
  await fs.ensureDir(paths.geminiSkillsDir);

  // 2. Build plugin structure
  const pluginAgentsDir = path.join(paths.pluginTargetDir, "agents");
  const pluginSkillsDir = path.join(paths.pluginTargetDir, "skills");
  const pluginRulesDir = path.join(paths.pluginTargetDir, "rules");
  const pluginHooksDir = path.join(paths.pluginTargetDir, "hooks");

  await fs.ensureDir(pluginAgentsDir);
  await fs.ensureDir(pluginSkillsDir);
  await fs.ensureDir(pluginRulesDir);
  await fs.ensureDir(pluginHooksDir);

  // Write plugin.json
  const pluginManifest = {
    name: "achira-workflow-os",
    displayName: "Achira Workflow",
    description:
      "Achira Workflow V5.2 — Universal multi-agent orchestration framework with 21 specialized agents, 85 modern skills (including 25 slash commands & scaffolds), safety hooks, and anti-slop engineering standards across all projects.",
    version: "5.2.0",
    disabled: false,
    suggestedPrompts: [
      "/orchestrate Build a full-stack application with clean architecture",
      "/coordinate Delegate multi-agent planning and execution",
      "/verify Run comprehensive code quality, security, and accessibility checks",
    ],
  };
  await fs.writeJson(path.join(paths.pluginTargetDir, "plugin.json"), pluginManifest, { spaces: 2 });

  // Write README.md
  const pluginReadme = `# Achira Workflow V5.2 (Global Antigravity Plugin)

Version: 5.2.0

Achira Workflow is an enterprise-grade AI-driven software engineering framework for Google Antigravity & Gemini.
Equipped with:
- **21 Specialized Autonomous Agents**
- **85 Modern Engineering & Command Skills** (60 Core Domain Skills + 25 Slash-Command & Scaffold Skills)
- **PreToolUse Safety Gates & Verification Hooks**
- **Cross-Session Memory & Anti-Slop Code Standards**
`;
  await fs.writeFile(path.join(paths.pluginTargetDir, "README.md"), pluginReadme, "utf-8");

  // Copy MCP and Hooks
  if (fs.existsSync(mcpSrc)) {
    await fs.copy(mcpSrc, path.join(paths.pluginTargetDir, "mcp_config.json"), { overwrite: true });
  }
  if (fs.existsSync(hooksDirSrc)) {
    await fs.copy(hooksDirSrc, pluginHooksDir, { overwrite: true });
  }

  // Write global plugin hooks.json pointing to the installed global hook script
  // so PreToolUse works in brand-new projects that don't have a local .agent/ folder
  const globalHookScript = path.join(pluginHooksDir, "validate-tool-call.mjs").split(path.sep).join("/");
  const globalHooksJson = {
    $schema: "hooks/antigravity-hooks.schema.json",
    enabled: true,
    PreToolUse: [
      {
        matcher: "run_command",
        command: `node "${globalHookScript}"`,
        timeout: 10,
      },
    ],
  };
  await fs.writeJson(path.join(paths.pluginTargetDir, "hooks.json"), globalHooksJson, { spaces: 2 });

  // Copy Agents to plugin & global config/agents
  let agentCount = 0;
  if (fs.existsSync(agentsSrc)) {
    const agents = (await fs.readdir(agentsSrc)).filter((f) => f.endsWith(".md"));
    for (const file of agents) {
      const srcFile = path.join(agentsSrc, file);
      await fs.copy(srcFile, path.join(pluginAgentsDir, file), { overwrite: true });
      await fs.copy(srcFile, path.join(paths.configAgentsDir, file), { overwrite: true });
    }
    agentCount = agents.length;
  }

  // Copy Skills to plugin & directly to global skills
  let skillCount = 0;
  if (fs.existsSync(skillsSrc)) {
    const entries = await fs.readdir(skillsSrc);
    for (const entry of entries) {
      const entryPath = path.join(skillsSrc, entry);
      const stat = await fs.stat(entryPath);
      if (stat.isDirectory()) {
        skillCount++;
        await fs.copy(entryPath, path.join(pluginSkillsDir, entry), { overwrite: true });
        await fs.copy(entryPath, path.join(paths.configSkillsDir, entry), { overwrite: true });
        await fs.copy(entryPath, path.join(paths.geminiSkillsDir, entry), { overwrite: true });
      }
    }
  }

  // Generate & write rules/AGENTS.md for plugin
  const compiledAgentsRule = generateAgentsRuleMarkdown(agentSrc);
  await fs.writeFile(path.join(pluginRulesDir, "AGENTS.md"), compiledAgentsRule, "utf-8");

  // Also sync to ~/.gemini/antigravity-ide if present on this machine
  if (fs.existsSync(paths.ideDir)) {
    try {
      await fs.ensureDir(paths.idePluginTargetDir);
      await fs.copy(paths.pluginTargetDir, paths.idePluginTargetDir, { overwrite: true });
      await fs.ensureDir(paths.ideSkillsDir);
      await fs.copy(paths.configSkillsDir, paths.ideSkillsDir, { overwrite: true });
    } catch {
      // Non-fatal if IDE dir is locked
    }
  }

  // Update ~/.gemini/GEMINI.md with universal global rules
  let existingGeminiContent = "";
  if (fs.existsSync(paths.geminiMdPath)) {
    existingGeminiContent = await fs.readFile(paths.geminiMdPath, "utf-8");
  }
  const achiraMarker = "<!-- ACHIRA-WORKFLOW-OS-GLOBAL-START -->";
  const achiraEndMarker = "<!-- ACHIRA-WORKFLOW-OS-GLOBAL-END -->";
  const geminiRulesPath = path.join(agentSrc, "rules", "GEMINI.md");
  let globalRuleContent = "";
  if (fs.existsSync(geminiRulesPath)) {
    globalRuleContent = await fs.readFile(geminiRulesPath, "utf-8");
  } else {
    globalRuleContent = compiledAgentsRule;
  }

  const wrappedAchiraRules = `${achiraMarker}\n${globalRuleContent}\n${achiraEndMarker}\n`;

  if (existingGeminiContent.includes(achiraMarker)) {
    const regex = new RegExp(`${achiraMarker}[\\s\\S]*?${achiraEndMarker}\\n?`, "g");
    const updated = existingGeminiContent.replace(regex, wrappedAchiraRules);
    await fs.writeFile(paths.geminiMdPath, updated, "utf-8");
  } else if (existingGeminiContent.trim().length === 0) {
    await fs.writeFile(paths.geminiMdPath, wrappedAchiraRules, "utf-8");
  } else {
    await fs.writeFile(paths.geminiMdPath, `${existingGeminiContent.trim()}\n\n${wrappedAchiraRules}`, "utf-8");
  }

  // Notify Antigravity LS (and persist enabled state in config.json)
  const lsResult = await notifyAntigravityLS(true);

  return {
    agentsInstalled: agentCount,
    skillsInstalled: skillCount,
    pluginDir: paths.pluginTargetDir,
    configSkillsDir: paths.configSkillsDir,
    geminiMdPath: paths.geminiMdPath,
    lsNotified: lsResult.notified,
  };
}

export async function doctorGlobal() {
  const paths = getGlobalPaths();

  const results = {
    allOk: true,
    checks: [],
    counts: { agents: 0, skills: 0, globalSkills: 0 },
    lsOnline: false,
  };

  // 1. Plugin checks
  const pluginJson = path.join(paths.pluginTargetDir, "plugin.json");
  const pluginAgents = path.join(paths.pluginTargetDir, "agents");
  const pluginSkills = path.join(paths.pluginTargetDir, "skills");
  const pluginRules = path.join(paths.pluginTargetDir, "rules", "AGENTS.md");
  const pluginHooks = path.join(paths.pluginTargetDir, "hooks.json");

  const pluginChecks = [
    { label: "Global Plugin Directory", path: paths.pluginTargetDir },
    { label: "plugin.json Manifest", path: pluginJson },
    { label: "Plugin Agents Directory", path: pluginAgents },
    { label: "Plugin Skills Directory", path: pluginSkills },
    { label: "Plugin Rules (rules/AGENTS.md)", path: pluginRules },
    { label: "Plugin Safety Hooks (hooks.json)", path: pluginHooks },
    { label: "Global Skills (~/.gemini/config/skills)", path: paths.configSkillsDir },
    { label: "Global Rules (~/.gemini/GEMINI.md)", path: paths.geminiMdPath },
  ];

  for (const c of pluginChecks) {
    const exists = fs.existsSync(c.path);
    results.checks.push({ label: c.label, path: c.path, ok: exists });
    if (!exists) results.allOk = false;
  }

  // Count items
  if (fs.existsSync(pluginAgents)) {
    results.counts.agents = (await fs.readdir(pluginAgents)).filter((f) => f.endsWith(".md")).length;
  }
  if (fs.existsSync(pluginSkills)) {
    const list = await fs.readdir(pluginSkills);
    for (const item of list) {
      if ((await fs.stat(path.join(pluginSkills, item))).isDirectory()) {
        results.counts.skills++;
      }
    }
  }
  if (fs.existsSync(paths.configSkillsDir)) {
    const list = await fs.readdir(paths.configSkillsDir);
    for (const item of list) {
      if ((await fs.stat(path.join(paths.configSkillsDir, item))).isDirectory()) {
        results.counts.globalSkills++;
      }
    }
  }

  // Check LS
  if (process.env.ANTIGRAVITY_LS_ADDRESS) {
    const [host, portStr] = process.env.ANTIGRAVITY_LS_ADDRESS.split(":");
    results.lsOnline = await new Promise((resolve) => {
      const req = http.request(
        {
          host,
          port: parseInt(portStr || "5387", 10),
          path: "/healthz",
          method: "GET",
          timeout: 1000,
        },
        (res) => resolve(res.statusCode === 200),
      );
      req.on("error", () => resolve(false));
      req.on("timeout", () => {
        req.destroy();
        resolve(false);
      });
      req.end();
    });
  }

  return results;
}

export async function uninstallGlobal({ baseDir } = {}) {
  const paths = getGlobalPaths();
  const agentSrc = baseDir || path.resolve(__dirname, "..", ".agent");
  const results = { removedPlugin: false, removedSkillsCount: 0, cleanedGeminiMd: false };

  // Remove plugin dirs
  if (fs.existsSync(paths.pluginTargetDir)) {
    await fs.remove(paths.pluginTargetDir);
    results.removedPlugin = true;
  }
  if (fs.existsSync(paths.idePluginTargetDir)) {
    await fs.remove(paths.idePluginTargetDir);
  }

  // Remove installed skills that belong to Achira
  const skillsSrc = path.join(agentSrc, "skills");
  if (fs.existsSync(skillsSrc)) {
    const entries = await fs.readdir(skillsSrc);
    for (const entry of entries) {
      for (const dir of [paths.configSkillsDir, paths.geminiSkillsDir, paths.ideSkillsDir]) {
        const targetSkill = path.join(dir, entry);
        if (fs.existsSync(targetSkill)) {
          await fs.remove(targetSkill);
          results.removedSkillsCount++;
        }
      }
    }
  }

  // Clean ~/.gemini/GEMINI.md
  if (fs.existsSync(paths.geminiMdPath)) {
    let content = await fs.readFile(paths.geminiMdPath, "utf-8");
    const achiraMarker = "<!-- ACHIRA-WORKFLOW-OS-GLOBAL-START -->";
    const achiraEndMarker = "<!-- ACHIRA-WORKFLOW-OS-GLOBAL-END -->";
    if (content.includes(achiraMarker)) {
      const regex = new RegExp(`${achiraMarker}[\\s\\S]*?${achiraEndMarker}\\n?`, "g");
      content = content.replace(regex, "").trim();
      await fs.writeFile(paths.geminiMdPath, content, "utf-8");
      results.cleanedGeminiMd = true;
    }
  }

  return results;
}
