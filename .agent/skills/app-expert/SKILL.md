---
name: app-expert
description: Master rules for Flutter, Avalonia (C#), and Mobile/Desktop App Design.
version: 1.0
---

# 📱 App Expert Core Rules

This skill provides the architectural foundation for multi-platform Mobile and Desktop applications.

## 1. Flutter & Dart 3 Architecture

- **State Management**: Prefer Riverpod for scalable, safe state management.
- **Clean Architecture**: Separate concerns into Presentation (UI), Domain (Business Logic/Models), and Data (Repositories/APIs).
- **Dart 3 Features**: Heavily utilize records, pattern matching, and exhaustive switch cases.
- **Performance**: Avoid rebuilding large widget trees. Use `const` constructors aggressively. Refactor heavy lifting to `Isolate`s if necessary.

## 2. Avalonia UI & C# (Zafiro)

- **MVVM Pattern**: Strictly separate Views (XAML) from ViewModels (C#).
- **Zafiro Toolkit**: Utilize functional-reactive UI patterns and robust data binding provided by the Zafiro toolkit.
- **Async/Await**: Ensure non-blocking UI. Use `Task` and `async/await` for IO or heavy CPU operations.
- **C# Pro Habits**: Use modern C# language features (records, pattern matching, LINQ).

## 3. Mobile & Desktop UX Design

- **Platform Guidelines**: Respect Material Design (Android) and Cupertino (iOS) paradigms where applicable, or enforce a unified premium custom design system.
- **Touch Targets**: Ensure interactive elements are at least 44x44 points for touch interfaces.
- **Responsive Layouts**: Handle orientation changes and window resizing gracefully using flexible constraints (e.g., Flexbox concepts, `LayoutBuilder`).
