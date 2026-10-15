---
version: 5.1.0
name: Achira Workflow V5.1 - Cyber-Minimalist Engineering
description: Normative design token specification and visual rationale for Achira Workflow V5.1 showcase portal.
colors:
  primary: "#00F2FE"
  primary-dark: "#0284C7"
  primary-hover: "#38BDF8"
  secondary: "#F59E0B"
  secondary-dark: "#D97706"
  success: "#10B981"
  background: "#070A0F"
  background-elevated: "#0C111D"
  surface: "#0F172A"
  surface-card: "#131D33"
  surface-card-hover: "#1A2744"
  border: "#1E293B"
  border-subtle: "#162032"
  border-glow: "rgba(0, 242, 254, 0.25)"
  text-primary: "#F8FAFC"
  text-secondary: "#94A3B8"
  text-muted: "#64748B"
  text-accent: "#38BDF8"
typography:
  headline-display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 52px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  headline-lg:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline-md:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
  code-mono:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.5
rounded:
  xs: 3px
  sm: 6px
  md: 10px
  lg: 14px
  xl: 20px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  hero: 72px
components:
  card:
    backgroundColor: "{colors.surface-card}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    padding: 20px
  badge:
    backgroundColor: "rgba(0, 242, 254, 0.1)"
    textColor: "{colors.primary}"
    borderColor: "{colors.border-glow}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
---

# Achira Workflow V5.1 — Design Specification

## Overview

Achira Workflow V5.1 embodies the **Cyber-Minimalist Engineering** visual aesthetic: high-contrast dark space, electric cyan streams representing multi-agent orchestration, signal amber telemetry nodes, and glassmorphic depth. It strictly rejects uninspired AI clichés, generic template cards, and purple slop.

## Colors

- **Primary Electric Cyan (`#00F2FE`)**: The energy frequency of real-time agentic execution.
- **Cobalt Anchor (`#0284C7`)**: Structural grounding and active borders.
- **Signal Amber (`#F59E0B`)**: Telemetry badges, state markers, and focal points.
- **Verified Emerald (`#10B981`)**: Test passing, health checks, runtime active status.
- **Obsidian Deep (`#070A0F`)**: Core canvas background providing infinite contrast.

## Typography

- **Display & Headings**: Inter variable font, aggressive negative tracking (`-0.02em` to `-0.03em`) for authoritative software engineering tone.
- **Body**: Inter for crisp reading clarity across high-density telemetry.
- **Code & Syntax**: JetBrains Mono for slash commands, CLI strings, and terminal telemetry.

## Layout

- **Responsive Grid**: 12-column dynamic CSS grid with flexible containment (`max-width: 1280px`).
- **Telemetry HUD**: Bento-style grid distribution balancing high density with visual hierarchy.

## Elevation & Depth

- Layering is achieved via subtle translucent surfaces (`rgba(19, 29, 51, 0.75)` with `backdrop-filter: blur(12px)`) and 1px crisp borders (`#1E293B`).
- Outer glows (`box-shadow: 0 0 25px rgba(0, 242, 254, 0.12)`) signify active agent states.

## Shapes

- Precision chamfers and controlled radii (`10px` for cards, `6px` for controls, `9999px` for status pills).

## Components

- **V5.1 Brand Header**: Fixed glass navigation with live Antigravity connection indicator and accessible mobile drawer.
- **Interactive Skills Matrix**: Multi-filter tabs (Master Pillars, Frontend, Backend, AI & Data, DevOps, Quality), real-time search, expandable detail drawer.
- **Workflows & Scaffolds Explorer**: Toggle between Project Scaffolds and Operational Commands with 1-click copy feedback.
- **Terminal Simulator / Quickstart**: Copyable `npm install -g achira-wf` and `achira-wf global install` pills.

## Do's and Don'ts

### DO
- ✅ Use sharp cyan gradients and high-contrast obsidian backgrounds.
- ✅ Display real engineering telemetry (54 skills, 21 agents, 25 workflows).
- ✅ Provide instant keyboard search and 1-click copy feedback.
- ✅ Ensure 100% WCAG AA contrast ratio across all text layers.

### DON'T
- ❌ **STRICT PURPLE BAN**: Never use purple, violet, indigo, or purple gradients.
- ❌ Do not use generic emoji spam as section icons.
- ❌ Do not create unresponsive or overflowing bento grids.

