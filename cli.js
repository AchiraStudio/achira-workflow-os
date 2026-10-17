#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import {
  installGlobal,
  doctorGlobal,
  uninstallGlobal,
  getGlobalPaths,
} from "./lib/global-manager.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = fs.readJsonSync(path.join(__dirname, "package.json"));

const AGENT_DIR = ".agent";
const REGISTRY_PATH = path.join(AGENT_DIR, "registry.json");

const program = new Command();

program
  .name("achira-wf")
  .description(
    "Achira Workflow V5.2 — Install agents, skills, and project scaffolds into any folder",
  )
  .version(pkg.version);

// ─── achira-wf init ───────────────────────────────────────────────────────────

program
  .command("init")
  .description(
    "Install .agent/ (agents, skills, scripts, rules, hooks) into the current directory",
  )
  .argument("[directory]", "Target directory (default: current directory)")
  .option("-f, --force", "Overwrite existing .agent/ directory")
  .action(async (directory, options) => {
    const target = directory ? path.resolve(process.cwd(), directory) : process.cwd();
    const src = path.join(__dirname, AGENT_DIR);
    const dest = path.join(target, AGENT_DIR);

    console.log(chalk.cyan("\n  achira-wf init\n"));
    console.log(chalk.gray(`  Target: ${target}\n`));

    if (!fs.existsSync(src)) {
      console.log(chalk.red("  ✖  Source .agent/ not found in package.\n"));
      process.exit(1);
    }

    if (fs.existsSync(dest) && src !== dest && !options.force) {
      console.log(chalk.yellow("  ⚠  .agent/ already exists at target."));
      console.log(
        chalk.yellow(`     Use ${chalk.bold("--force")} to overwrite.\n`),
      );
      process.exit(1);
    }

    // 1. Install .agent/
    try {
      if (src !== dest) {
        await fs.ensureDir(dest);
        await fs.copy(src, dest, { overwrite: true });
        console.log(chalk.green("  ✔  .agent/ installed (21 agents, 85 unified skills, rules & safety hooks)\n"));
      } else {
        console.log(chalk.gray("  ℹ  Running in source directory, skipping .agent/ copy\n"));
      }
    } catch (err) {
      console.log(chalk.red(`  ✖  Failed: ${err.message}\n`));
      process.exit(1);
    }

    console.log(chalk.blue("═════════════════════════════════════════\n"));

    // 2. Sync .cursorrules for automatic IDE rules
    try {
      const cursorRulesPath = path.join(target, ".cursorrules");
      const geminiRulesPath = path.join(dest, "rules", "GEMINI.md");
      await fs.remove(cursorRulesPath);
      try {
        await fs.ensureSymlink(geminiRulesPath, cursorRulesPath, "file");
        console.log(chalk.green("  ✔  Linked .cursorrules → .agent/rules/GEMINI.md\n"));
      } catch {
        if (fs.existsSync(geminiRulesPath)) {
          await fs.copy(geminiRulesPath, cursorRulesPath);
          console.log(chalk.green("  ✔  Synced .cursorrules → .agent/rules/GEMINI.md\n"));
        }
      }
    } catch (err) {
      console.log(chalk.yellow(`  ⚠  Could not setup .cursorrules: ${err.message}\n`));
    }

    // 3. Print registry summary
    const registryFile = path.join(dest, "registry.json");
    if (fs.existsSync(registryFile)) {
      try {
        const registry = fs.readJsonSync(registryFile);
        const engineMajor = parseInt(pkg.version.split(".")[0], 10);
        const registryEngine = registry.engine || "unknown";
        const registryMajor = parseInt(registryEngine.split(".")[0], 10);
        if (engineMajor !== registryMajor) {
          console.log(
            chalk.yellow(
              `  ⚠  Engine mismatch: CLI v${pkg.version} / registry engine ${registryEngine}\n`,
            ),
          );
        }
        console.log(chalk.white("  Achira Workflow V5.2 initialized.\n"));
        console.log(chalk.cyan("  Project Scaffold Skills:\n"));
        for (const [key, val] of Object.entries(registry.templates || {})) {
          console.log(
            chalk.white(`    /${key}`) +
              chalk.gray(`  — ${val.description}`),
          );
        }
        console.log(chalk.cyan("\n  Command Skills:\n"));
        for (const [key, val] of Object.entries(registry.commands || {})) {
          console.log(
            chalk.white(`    /${key}`) + chalk.gray(`  — ${val.description}`),
          );
        }
        console.log("");
        console.log(chalk.gray("  Tip: Run `achira-wf global install` to enable all 85 skills & 21 agents globally across all projects!\n"));
      } catch {
        console.log(chalk.yellow("  ⚠  Could not parse registry.json\n"));
      }
    }
  });

// ─── achira-wf create <template> ─────────────────────────────────────────────

program
  .command("create <template>")
  .description(
    "Scaffold a project from a registered skill template (react, next, html)",
  )
  .action((template) => {
    const localRegistry = path.join(process.cwd(), REGISTRY_PATH);
    const pkgRegistry = path.join(__dirname, REGISTRY_PATH);
    const registryFile = fs.existsSync(localRegistry) ? localRegistry : pkgRegistry;

    if (!fs.existsSync(registryFile)) {
      console.log(
        chalk.red("\n  ✖  No .agent/registry.json found. Run `achira-wf init` first.\n"),
      );
      process.exit(1);
    }

    let registry;
    try {
      registry = fs.readJsonSync(registryFile);
    } catch {
      console.log(chalk.red("\n  ✖  Could not parse registry.json\n"));
      process.exit(1);
    }

    const entry = registry.templates?.[template];
    if (!entry) {
      const available = Object.keys(registry.templates || {}).join(", ");
      console.log(chalk.red(`\n  ✖  Unknown template: "${template}"`));
      console.log(chalk.gray(`     Available: ${available}\n`));
      process.exit(1);
    }

    const skillRel = entry.skill || entry.workflow;
    const baseDir = fs.existsSync(localRegistry) ? process.cwd() : __dirname;
    const skillPath = path.join(
      baseDir,
      AGENT_DIR,
      "skills",
      skillRel,
    );

    if (!fs.existsSync(skillPath)) {
      console.log(
        chalk.red(`\n  ✖  Skill file not found: ${skillRel}\n`),
      );
      process.exit(1);
    }

    console.log(chalk.cyan(`\n  /${template}\n`));
    console.log(chalk.green(`  ✔  Template: ${entry.description}`));
    console.log(
      chalk.green(`  ✔  Skill: .agent/skills/${skillRel}`),
    );
    console.log(
      chalk.white(
        `\n  → Follow the skill steps in the IDE, or use the /${template} slash command.\n`,
      ),
    );
  });

// ─── achira-wf list ──────────────────────────────────────────────────────────

program
  .command("list")
  .description("List all available skills and templates")
  .action(() => {
    const localRegistry = path.join(process.cwd(), REGISTRY_PATH);
    const pkgRegistry = path.join(__dirname, REGISTRY_PATH);
    const registryFile = fs.existsSync(localRegistry) ? localRegistry : pkgRegistry;

    if (!fs.existsSync(registryFile)) {
      console.log(
        chalk.red("\n  ✖  No .agent/registry.json found. Run `achira-wf init` first.\n"),
      );
      process.exit(1);
    }

    let registry;
    try {
      registry = fs.readJsonSync(registryFile);
    } catch {
      console.log(chalk.red("\n  ✖  Could not parse registry.json\n"));
      process.exit(1);
    }

    console.log(chalk.cyan("\n  Achira Workflow V5.2\n"));
    console.log(
      chalk.gray(
        `  Engine: ${registry.engine}  Version: ${registry.version}\n`,
      ),
    );

    console.log(chalk.cyan("  Project Scaffolds:\n"));
    for (const [key, val] of Object.entries(registry.templates || {})) {
      console.log(
        chalk.white(`    /${key}`) +
          chalk.gray(`  — ${val.description}`),
      );
    }

    console.log(chalk.cyan("\n  Slash Commands:\n"));
    for (const [key, val] of Object.entries(registry.commands || {})) {
      console.log(
        chalk.white(`    /${key}`) + chalk.gray(`  — ${val.description}`),
      );
    }
    console.log("");
  });

// ─── achira-wf doctor ────────────────────────────────────────────────────────

program
  .command("doctor")
  .description("Validate .agent/ installation integrity (local or global)")
  .option("-g, --global", "Check global Antigravity installation (~/.gemini/config/)")
  .action(async (options) => {
    if (options.global) {
      console.log(chalk.cyan("\n  achira-wf doctor --global\n"));
      const doc = await doctorGlobal({ baseDir: path.join(__dirname, AGENT_DIR) });
      for (const check of doc.checks) {
        if (check.ok) {
          console.log(chalk.green(`  ✔  ${check.label}`));
        } else {
          console.log(chalk.red(`  ✖  ${check.label} — MISSING (${check.path})`));
        }
      }
      console.log(chalk.gray(`\n  Plugin Agents:        ${doc.counts.agents}`));
      console.log(chalk.gray(`  Plugin Skills:        ${doc.counts.skills}`));
      console.log(chalk.gray(`  Global Config Skills: ${doc.counts.globalSkills}`));
      console.log(
        chalk.gray(
          `  Antigravity LS:       ${doc.lsOnline ? chalk.green("Online") : chalk.yellow("Offline/Inactive")}`,
        ),
      );

      console.log("");
      if (doc.allOk) {
        console.log(chalk.green("  ✔  Global Antigravity ecosystem is healthy and active machine-wide!\n"));
      } else {
        console.log(chalk.yellow("  ⚠  Some global components are missing. Run `achira-wf global install` to fix.\n"));
      }
      return;
    }

    const base = path.join(process.cwd(), AGENT_DIR);
    console.log(chalk.cyan("\n  achira-wf doctor\n"));

    if (!fs.existsSync(base)) {
      console.log(chalk.yellow(`  ⚠  No local .agent/ found in: ${process.cwd()}\n`));
      const doc = await doctorGlobal({ baseDir: path.join(__dirname, AGENT_DIR) });
      if (doc.allOk) {
        console.log(chalk.green("  ✔  Global Achira Workflow V5.2 is ACTIVE machine-wide!"));
        console.log(chalk.gray(`     (${doc.counts.skills} skills, ${doc.counts.agents} agents available globally)\n`));
        console.log(
          chalk.cyan("  Tip:") +
            chalk.white(" Run ") +
            chalk.bold("`achira-wf init`") +
            chalk.white(" to initialize local project skills and safety gates.\n"),
        );
      } else {
        console.log(chalk.gray("  Run `achira-wf init` to initialize in this directory, or `achira-wf global install` for global access.\n"));
      }
      return;
    }

    const checks = [
      { label: ".agent/", path: base },
      { label: "agents/", path: path.join(base, "agents") },
      { label: "skills/", path: path.join(base, "skills") },
      { label: "shared/", path: path.join(base, "shared") },
      { label: "registry.json", path: path.join(base, "registry.json") },
      { label: "scripts/", path: path.join(base, "scripts") },
      { label: "rules/GEMINI.md", path: path.join(base, "rules", "GEMINI.md") },
      { label: "memory/", path: path.join(base, "memory") },
      { label: "hooks.json", path: path.join(base, "hooks.json") },
      { label: "antigravity.json", path: path.join(base, "antigravity.json") },
      { label: "ARCHITECTURE.md", path: path.join(base, "ARCHITECTURE.md") },
    ];

    let allOk = true;
    for (const check of checks) {
      if (fs.existsSync(check.path)) {
        console.log(chalk.green(`  ✔  ${check.label}`));
      } else {
        console.log(chalk.red(`  ✖  ${check.label} — MISSING`));
        allOk = false;
      }
    }

    // Count agents and skills
    const agentsDir = path.join(base, "agents");
    const skillsDir = path.join(base, "skills");

    if (fs.existsSync(agentsDir)) {
      const agentCount = fs
        .readdirSync(agentsDir)
        .filter((f) => f.endsWith(".md")).length;
      console.log(chalk.gray(`\n  Agents: ${agentCount}`));
    }
    if (fs.existsSync(skillsDir)) {
      const skillCount = fs
        .readdirSync(skillsDir)
        .filter((f) =>
          fs.statSync(path.join(skillsDir, f)).isDirectory(),
        ).length;
      console.log(chalk.gray(`  Skills: ${skillCount}`));
    }

    // Registry engine check
    const registryFile = path.join(base, "registry.json");
    if (fs.existsSync(registryFile)) {
      try {
        const registry = fs.readJsonSync(registryFile);
        console.log(
          chalk.gray(
            `  Registry: engine ${registry.engine}, version ${registry.version}`,
          ),
        );
      } catch {
        console.log(chalk.yellow("  ⚠  registry.json parse error"));
        allOk = false;
      }
    }

    console.log("");
    if (allOk) {
      console.log(chalk.green("  All checks passed. System healthy.\n"));
    } else {
      console.log(
        chalk.red("  Some checks failed. Run `achira-wf init` to repair.\n"),
      );
      process.exit(1);
    }
  });

// ─── achira-wf global ────────────────────────────────────────────────────────

const globalCmd = program
  .command("global")
  .description("Manage global Antigravity & Gemini integration (~/.gemini/config/)");

globalCmd
  .command("install")
  .description("Deploy Achira Workflow V5.2 globally across all projects on your machine")
  .option("-s, --silent", "Suppress non-error output (used during postinstall)")
  .action(async (options) => {
    if (!options.silent) {
      console.log(chalk.cyan("\n  achira-wf global install\n"));
    }
    try {
      const res = await installGlobal({ baseDir: path.join(__dirname, AGENT_DIR) });
      if (!options.silent) {
        console.log(chalk.green(`  ✔  Global Plugin deployed → ${res.pluginDir}`));
        console.log(chalk.green(`  ✔  ${res.agentsInstalled} Agents registered globally`));
        console.log(chalk.green(`  ✔  ${res.skillsInstalled} Skills registered globally → ${res.configSkillsDir}`));
        console.log(chalk.green(`  ✔  Universal Rules active → ${res.geminiMdPath}`));
        if (res.lsNotified) {
          console.log(chalk.green("  ✔  Antigravity IDE Language Server notified & plugin enabled live!"));
        } else {
          console.log(chalk.gray("  ℹ  Note: Restart Antigravity IDE if open to pick up global plugin discovery."));
        }
        console.log(chalk.cyan("\n  Success! Achira Workflow V5.2 is now accessible in ALL projects machine-wide.\n"));
      }
    } catch (err) {
      if (!options.silent) {
        console.log(chalk.red(`  ✖  Global installation failed: ${err.message}\n`));
        process.exit(1);
      }
    }
  });

globalCmd
  .command("sync")
  .description("Sync latest agents, skills, and rules to global ~/.gemini/config/")
  .action(async () => {
    console.log(chalk.cyan("\n  achira-wf global sync\n"));
    try {
      const res = await installGlobal({ baseDir: path.join(__dirname, AGENT_DIR) });
      console.log(
        chalk.green(
          `  ✔  Synchronized ${res.skillsInstalled} skills & ${res.agentsInstalled} agents to global config\n`,
        ),
      );
    } catch (err) {
      console.log(chalk.red(`  ✖  Sync failed: ${err.message}\n`));
      process.exit(1);
    }
  });

globalCmd
  .command("doctor")
  .description("Validate global Antigravity installation health")
  .action(async () => {
    console.log(chalk.cyan("\n  achira-wf global doctor\n"));
    const doc = await doctorGlobal({ baseDir: path.join(__dirname, AGENT_DIR) });
    for (const check of doc.checks) {
      if (check.ok) {
        console.log(chalk.green(`  ✔  ${check.label}`));
      } else {
        console.log(chalk.red(`  ✖  ${check.label} — MISSING`));
      }
    }
    console.log(chalk.gray(`\n  Plugin Agents:        ${doc.counts.agents}`));
    console.log(chalk.gray(`  Plugin Skills:        ${doc.counts.skills}`));
    console.log(chalk.gray(`  Global Config Skills: ${doc.counts.globalSkills}`));
    console.log(
      chalk.gray(
        `  Antigravity LS:       ${doc.lsOnline ? chalk.green("Online") : chalk.yellow("Offline/Inactive")}`,
      ),
    );

    console.log("");
    if (doc.allOk) {
      console.log(chalk.green("  ✔  Global Antigravity ecosystem is healthy and active machine-wide!\n"));
    } else {
      console.log(chalk.yellow("  ⚠  Some global components are missing. Run `achira-wf global install` to fix.\n"));
    }
  });

globalCmd
  .command("status")
  .description("Show global installation status and active plugins")
  .action(async () => {
    const paths = getGlobalPaths();
    console.log(chalk.cyan("\n  Achira Workflow V5.2 — Global Status\n"));
    console.log(chalk.gray(`  Plugin Directory: ${paths.pluginTargetDir}`));
    console.log(chalk.gray(`  Skills Directory: ${paths.configSkillsDir}`));
    console.log(chalk.gray(`  Rules File:       ${paths.geminiMdPath}\n`));

    const pluginExists = fs.existsSync(paths.pluginTargetDir);
    const rulesExists = fs.existsSync(paths.geminiMdPath);
    console.log(pluginExists ? chalk.green("  ✔  Plugin installed") : chalk.yellow("  ✖  Plugin not installed"));
    console.log(rulesExists ? chalk.green("  ✔  Global rules active") : chalk.yellow("  ✖  Global rules missing"));
    console.log("");
  });

globalCmd
  .command("uninstall")
  .description("Safely remove Achira Workflow V5.2 from global ~/.gemini/config/")
  .action(async () => {
    console.log(chalk.cyan("\n  achira-wf global uninstall\n"));
    const res = await uninstallGlobal({ baseDir: path.join(__dirname, AGENT_DIR) });
    if (res.removedPlugin) {
      console.log(chalk.green("  ✔  Removed global plugin"));
    }
    if (res.removedSkillsCount > 0) {
      console.log(chalk.green("  ✔  Removed global skills"));
    }
    if (res.cleanedGeminiMd) {
      console.log(chalk.green("  ✔  Cleaned universal rules from GEMINI.md"));
    }
    console.log(chalk.cyan("\n  Uninstalled global Achira Workflow V5.2 components.\n"));
  });

program.parse();
