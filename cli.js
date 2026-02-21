#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = fs.readJsonSync(path.join(__dirname, "package.json"));

const ACHIRA_DIR = ".achira";
const REGISTRY_PATH = path.join(ACHIRA_DIR, "workflows", "registry.json");

const program = new Command();

program
  .name("achira-wf")
  .description(
    "Achira Workflow OS — Install agents, skills, and project scaffolds into any folder"
  )
  .version(pkg.version);

// ─── achira-wf init ───────────────────────────────────────────────────────────

program
  .command("init")
  .description("Install .achira/ (agents, skills, workflows, scripts) into the current directory")
  .option("-f, --force", "Overwrite existing .achira/ directory")
  .action(async (options) => {
    const target = process.cwd();
    const src = path.join(__dirname, ACHIRA_DIR);
    const dest = path.join(target, ACHIRA_DIR);

    console.log(chalk.cyan("\n  achira-wf init\n"));
    console.log(chalk.gray(`  Target: ${target}\n`));

    if (!fs.existsSync(src)) {
      console.log(chalk.red("  ✖  Source .achira/ not found in package.\n"));
      process.exit(1);
    }

    if (fs.existsSync(dest) && !options.force) {
      console.log(chalk.yellow("  ⚠  .achira/ already exists at target."));
      console.log(chalk.yellow(`     Use ${chalk.bold("--force")} to overwrite.\n`));
      process.exit(1);
    }

    // 1. Install .achira/
    try {
      await fs.ensureDir(dest);
      await fs.copy(src, dest, { overwrite: true });
      console.log(chalk.green("  ✔  .achira/ installed\n"));
    } catch (err) {
      console.log(chalk.red(`  ✖  Failed: ${err.message}\n`));
      process.exit(1);
    }

    // 2. Sync .agent/workflows/ for IDE slash command discovery
    try {
      const agentWfDir = path.join(target, ".agent", "workflows");
      await fs.ensureDir(agentWfDir);
      const wfSrc = path.join(dest, "workflows");
      const mdFiles = (await fs.readdir(wfSrc)).filter((f) => f.endsWith(".md"));
      for (const file of mdFiles) {
        await fs.copy(path.join(wfSrc, file), path.join(agentWfDir, file), { overwrite: true });
      }
      console.log(chalk.green(`  ✔  Synced ${mdFiles.length} workflows → .agent/workflows/\n`));
    } catch (err) {
      console.log(chalk.yellow(`  ⚠  Could not sync .agent/workflows/: ${err.message}\n`));
    }

    // 3. Print registry summary
    const registryFile = path.join(dest, "workflows", "registry.json");
    if (fs.existsSync(registryFile)) {
      try {
        const registry = fs.readJsonSync(registryFile);
        const engineMajor = parseInt(pkg.version.split(".")[0], 10);
        const registryEngine = registry.engine || "unknown";
        const registryMajor = parseInt(registryEngine.split(".")[0], 10);
        if (engineMajor !== registryMajor) {
          console.log(chalk.yellow(`  ⚠  Engine mismatch: CLI v${pkg.version} / registry engine ${registryEngine}\n`));
        }
        console.log(chalk.white("  Achira Workflow OS initialized.\n"));
        console.log(chalk.cyan("  Project Scaffolds:\n"));
        for (const [key, val] of Object.entries(registry.templates || {})) {
          console.log(chalk.white(`    achira-wf create ${key}`) + chalk.gray(`  — ${val.description}`));
        }
        console.log(chalk.cyan("\n  Slash Commands:\n"));
        for (const [key, val] of Object.entries(registry.commands || {})) {
          console.log(chalk.white(`    /${key}`) + chalk.gray(`  — ${val.description}`));
        }
        console.log("");
      } catch {
        console.log(chalk.yellow("  ⚠  Could not parse registry.json\n"));
      }
    }
  });

// ─── achira-wf create <template> ─────────────────────────────────────────────

program
  .command("create <template>")
  .description("Scaffold a project from a registered template (react, next, html)")
  .action((template) => {
    const registryFile = path.join(process.cwd(), REGISTRY_PATH);

    if (!fs.existsSync(registryFile)) {
      console.log(
        chalk.red(
          "\n  ✖  No .achira/ found. Run `achira-wf init` first.\n"
        )
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
      console.log(
        chalk.red(`\n  ✖  Unknown template: "${template}"`)
      );
      console.log(chalk.gray(`     Available: ${available}\n`));
      process.exit(1);
    }

    const workflowPath = path.join(
      process.cwd(),
      ACHIRA_DIR,
      "workflows",
      entry.workflow
    );

    if (!fs.existsSync(workflowPath)) {
      console.log(
        chalk.red(`\n  ✖  Workflow file not found: ${entry.workflow}\n`)
      );
      process.exit(1);
    }

    console.log(chalk.cyan(`\n  achira-wf create ${template}\n`));
    console.log(chalk.green(`  ✔  Template: ${entry.description}`));
    console.log(
      chalk.green(`  ✔  Workflow: .achira/workflows/${entry.workflow}`)
    );
    console.log(
      chalk.white(
        `\n  → Open the workflow file and follow the steps, or use the /create slash command.\n`
      )
    );
  });

// ─── achira-wf list ──────────────────────────────────────────────────────────

program
  .command("list")
  .description("List all available workflows and templates")
  .action(() => {
    const registryFile = path.join(process.cwd(), REGISTRY_PATH);

    if (!fs.existsSync(registryFile)) {
      console.log(
        chalk.red(
          "\n  ✖  No .achira/ found. Run `achira-wf init` first.\n"
        )
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

    console.log(chalk.cyan("\n  Achira Workflow OS\n"));
    console.log(
      chalk.gray(`  Engine: ${registry.engine}  Version: ${registry.version}\n`)
    );

    console.log(chalk.cyan("  Project Scaffolds:\n"));
    for (const [key, val] of Object.entries(registry.templates || {})) {
      console.log(
        chalk.white(`    achira-wf create ${key}`) +
          chalk.gray(`  — ${val.description}`)
      );
    }

    console.log(chalk.cyan("\n  Slash Commands:\n"));
    for (const [key, val] of Object.entries(registry.commands || {})) {
      console.log(
        chalk.white(`    /${key}`) + chalk.gray(`  — ${val.description}`)
      );
    }
    console.log("");
  });

// ─── achira-wf doctor ────────────────────────────────────────────────────────

program
  .command("doctor")
  .description("Validate .achira/ installation integrity")
  .action(() => {
    const base = path.join(process.cwd(), ACHIRA_DIR);
    console.log(chalk.cyan("\n  achira-wf doctor\n"));

    const checks = [
      { label: ".achira/", path: base },
      { label: "core/agents/", path: path.join(base, "core", "agents") },
      { label: "core/skills/", path: path.join(base, "core", "skills") },
      { label: "core/shared/", path: path.join(base, "core", "shared") },
      { label: "workflows/", path: path.join(base, "workflows") },
      {
        label: "workflows/registry.json",
        path: path.join(base, "workflows", "registry.json"),
      },
      { label: "scripts/", path: path.join(base, "scripts") },
      { label: "rules/GEMINI.md", path: path.join(base, "rules", "GEMINI.md") },
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
    const agentsDir = path.join(base, "core", "agents");
    const skillsDir = path.join(base, "core", "skills");
    const workflowsDir = path.join(base, "workflows");

    if (fs.existsSync(agentsDir)) {
      const agentCount = fs
        .readdirSync(agentsDir)
        .filter((f) => f.endsWith(".md")).length;
      console.log(chalk.gray(`\n  Agents: ${agentCount}`));
    }
    if (fs.existsSync(skillsDir)) {
      const skillCount = fs
        .readdirSync(skillsDir)
        .filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory()).length;
      console.log(chalk.gray(`  Skills: ${skillCount}`));
    }
    if (fs.existsSync(workflowsDir)) {
      const wfCount = fs
        .readdirSync(workflowsDir)
        .filter((f) => f.endsWith(".md")).length;
      console.log(chalk.gray(`  Workflows: ${wfCount}`));
    }

    // Registry engine check
    const registryFile = path.join(base, "workflows", "registry.json");
    if (fs.existsSync(registryFile)) {
      try {
        const registry = fs.readJsonSync(registryFile);
        console.log(
          chalk.gray(
            `  Registry: engine ${registry.engine}, version ${registry.version}`
          )
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
        chalk.red("  Some checks failed. Run `achira-wf init` to repair.\n")
      );
      process.exit(1);
    }
  });

program.parse();
