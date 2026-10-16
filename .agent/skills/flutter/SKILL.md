---
name: flutter
description: Scaffold a Flutter multi-platform app with clean architecture and Riverpod state management.
version: 4.2.0
requires_agents: mobile-developer
requires_skills: app-expert, mobile-design, clean-code, verify-changes
artifact_outputs: mobile-architecture, project-structure
---

# Flutter Multi-Platform App Scaffolding

> 🔗 Skill: .achira/core/skills/app-expert

// turbo-all

## 1. Create the Flutter Project

```bash
flutter create --platforms=ios,android,web,mac,windows,linux my_app
cd my_app
```

## 2. Core Dependencies

```bash
flutter pub add flutter_riverpod hooks_riverpod
flutter pub add go_router
flutter pub add dartz
flutter pub add equatable
flutter pub add dio
flutter pub add google_fonts
```

## 3. Directory Structure (Feature-Based)

```
lib/
├── features/           # Feature-based modular architecture
│   └── auth/
│       ├── data/
│       ├── domain/
│       └── presentation/
├── core/               # Shared utilities, theme, routing
│   ├── router/
│   ├── theme/
│   └── utils/
└── main.dart
```

## 4. Architecture Rules

- Use `Riverpod` for state management and dependency injection.
- Split features cleanly into presentation, domain, and data layers (Clean Architecture).
- Use `go_router` for all navigation.
- Use `dartz` or seals classes for error handling instead of throwing exceptions.
- Prefer `StatelessWidget` with `ConsumerWidget` or `HookConsumerWidget` over `StatefulWidget`.
