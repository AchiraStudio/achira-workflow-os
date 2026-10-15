---
name: unity
description: Scaffold a Unity game development project focusing on C#, best practices, and performance.
version: 4.2.0
requires_agents: game-developer
requires_skills: game-expert, game-development, clean-code, verify-changes
artifact_outputs: game-architecture, unity-structure
---

> 🔗 Skill: .achira/core/skills/game-expert

// turbo-all

## 1. Project Organization

A clear folder structure inside the `Assets/` directory is critical. Create the following:

```
Assets/
├── _Project/           # Keep all your custom work here to avoid store asset conflicts
│   ├── Art/            # Textures, models, materials
│   ├── Scripts/        # C# sources
│   ├── Scenes/         # .unity scene files
│   ├── Prefabs/        # Reusable GameObject setups
│   └── Settings/       # Input, Physics, Quality assets
└── ThirdParty/         # Asset store downloads
```

## 2. C# Best Practices

- **Zero Allocation in Update:** Avoid `new`, string formatting, or LINQ in the `Update()`, `FixedUpdate()`, or `LateUpdate()` loops.
- **Reference Caching:** Never use `GameObject.Find`, `GetComponent`, or `Camera.main` in Update loops. Cache these in `Awake()` or `Start()`.
- **Inspector Variables:** Use `[SerializeField] private Type varName;` instead of `public Type varName;` for proper encapsulation.
- **Event Driven:** Use C# events (`Action` or `UnityEvent`) instead of polling in Update loops when responding to state changes.

## 3. Object Pooling

Implement a generic Object Pool manager for projectiles, effects, and frequently instantiated objects.

## 4. Source Control (`.gitignore`)

Ensure Unity auto-generated files are ignored:

```
[Ll]ibrary/
[Tt]emp/
[Oo]bj/
[Bb]uild/
[Bb]uilds/
[Ll]ogs/
[Mm]emoryCaptures/
*.csproj
*.unityproj
*.sln
*.suo
*.tmp
*.user
*.userprefs
*.pidb
*.booproj
*.svd
*.pdb
*.mdb
*.opendb
*.VC.db
ExportedObj/
```
