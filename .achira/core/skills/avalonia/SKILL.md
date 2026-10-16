---
name: avalonia
description: Scaffold a cross-platform desktop application using Avalonia UI and the Zafiro functional-reactive toolkit.
version: 4.2.0
requires_agents: mobile-developer
requires_skills: app-expert, mobile-design, clean-code, verify-changes
artifact_outputs: desktop-architecture, project-structure
---

# Avalonia UI Desktop Application Scaffolding

> 🔗 Skill: .achira/core/skills/app-expert

// turbo-all

## Philosophy

- Pure MVVM using ReactiveUI + DynamicData
- ViewModels have zero Avalonia dependency
- `Result<T>` types for error handling (no exceptions for flow)
- Zafiro helpers used before implementing custom solutions

## 1. Create the Avalonia Project

```bash
dotnet new avalonia.mvvm -n MyApp
```

## 2. Directory Structure

```
MyApp/
├── MyApp/              # Core project (ViewModels, Services, Models)
│   ├── ViewModels/
│   ├── Services/
│   ├── Models/
│   └── App.axaml.cs
├── MyApp.UI/           # Avalonia UI project (Views, Controls)
│   ├── Views/
│   ├── Controls/
│   └── App.axaml
└── MyApp.Tests/        # Unit tests
```

## 3. Core Packages

Ensure the following packages are added to the core project:

- `ReactiveUI`
- `DynamicData`
- `Zafiro.Avalonia`
- `Zafiro.Core`
- `CSharpFunctionalExtensions` (for Result<T>)
