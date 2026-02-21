---
name: game-expert
description: Master rules for Unity Game Development and high-performance C#.
version: 1.0
---

# 🎮 Game Expert Core Rules

This skill encapsulates the strict performance and architectural requirements for Unity 6 LTS development.

## 1. High-Performance C#

- **Zero Allocations**: Avoid garbage collection spikes in the `Update` loop.
- **Object Pooling**: Pre-instantiate reusable objects (bullets, enemies, fx) instead of using `Instantiate`/`Destroy` at runtime.
- **Structs vs Classes**: Use `struct` for small data containers to avoid heap allocations.
- **Cache Components**: Never call `GetComponent<T>()` or `Find()` in `Update`. Cache references in `Awake` or `Start`.

## 2. Unity Architecture

- **ScriptableObjects**: Use ScriptableObjects for configuration, game data, and event architectures to decouple systems.
- **Decoupled Systems**: Implement event-driven communication (e.g., C# `Action` or UnityEvents) instead of tight coupling via singletons.
- **Manager Pattern**: Keep global managers limited. Prefer dependency injection or service locators.

## 3. Physics & Rendering

- **FixedUpdate**: All Rigidbody manipulation and physics calculations go in `FixedUpdate`.
- **Canvas Optimization**: Separate static UI elements from dynamic/changing elements onto different Graphic Raycasters/Canvases to reduce UI rebuilds.
