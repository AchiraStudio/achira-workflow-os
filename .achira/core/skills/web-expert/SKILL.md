---
name: web-expert
description: Master rules for React, Next.js, Vanilla Web, JS/TS patterns, and SEO.
version: 1.0
---

# 🕸️ Web Expert Core Rules

This skill acts as a comprehensive guide for all web development (Next.js, React SPA, and Vanilla HTML/JS/CSS).

## 1. Next.js App Router & React Patterns

- **Server Components by Default**: Next.js components should be Server Components unless they need `useState`, `useEffect`, `onClick`, or browser APIs. Add `"use client"` as far down the tree as possible.
- **Data Fetching**: Fetch data natively with async/await in Server Components. Use Server Actions for mutations.
- **Waterfalls**: Avoid data fetch waterfalls. Use `Promise.all` for parallel operations.
- **Caching**: Understand Next.js caching (Static by default, dynamic with `no-store` or params).
- **React State**: Lift state down. Use functional state updates for stable callbacks. Use custom hooks for complex logic.

## 2. Modern JavaScript & TypeScript (TS/JS Expert)

- **Strict Typing**: If TS is used, avoid `any`. Define robust interfaces/types.
- **Immutability**: Never mutate state directly. Use array methods like `map`, `filter`, `reduce`, or `toSorted`.
- **Early Returns**: Keep functions flat by returning early on edge cases or errors.
- **Destructuring**: Use object and array destructuring for clean variable access.

## 3. Web Design & Premium UX Fundamentals

- **Sleek Aesthetics**: Applications must look premium by default. Use curated, harmonious color palettes (e.g., modern dark modes with subtle contrast). Avoid pure #000000 or generic #FF0000.
- **Glassmorphism & Gradients**: Utilize subtle background blurs and smooth gradients to elevate the UI above basic flat design.
- **Micro-Animations**: All interactive elements (buttons, cards, links) must have responsive hover states (`scale`, `opacity`, `translate`) with smooth transitions (e.g., `transition-all duration-300`).
- **Semantic HTML**: Use proper tags (`<main>`, `<article>`, `<nav>`, `<button>`). Do not use `<div>` for buttons.
- **Accessibility (a11y)**: Include `alt` text, ARIA where needed, and ensure color contrast and keyboard navigability.

## 4. Advanced SEO & Performance

- **Meta Tags**: Always ensure proper `<title>`, `<meta name="description">`, and Open Graph (`og:image`, `og:title`) tags for routing pages.
- **Structured Data**: Use JSON-LD (`<script type="application/ld+json">`) for products, articles, and breadcrumbs to enhance rich search results.
- **Core Web Vitals**: Defer non-critical CSS/JS. Optimize images (Next.js `<Image>`) with proper `sizes` and `priority` attributes for LCP elements.
