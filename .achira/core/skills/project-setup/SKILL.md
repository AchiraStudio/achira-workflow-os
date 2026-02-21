---
name: project-setup
description: Universal architecture standards for all Achira web projects — covers html+js+css, react+vite, and next.js workflows.
version: 3.0
---

# 🏗️ Achira Project Standards

This skill is the **single source of truth** for how all Achira projects are structured. It applies to every workflow — `/html+js+css`, `/react+vite`, and `/next.js`.

**Read this before creating, moving, naming, or deleting any file.**

---

## 🗺️ Workflow Map

| Slash Command  | Tech Stack              | Ideal Use Case                          |
| -------------- | ----------------------- | --------------------------------------- |
| `/html+js+css` | Vanilla HTML + CSS + JS | Multi-page sites, lightweight, no-build |
| `/react+vite`  | React + Vite + Router   | SPAs, highly interactive client apps    |
| `/next.js`     | Next.js App Router + TS | Full-stack, SSR, SEO-heavy, SaaS        |

---

## 🌍 Universal Core Rules

These rules apply strictly across **all** workflows:

1.  **No Inline Styles.** All CSS lives in dedicated `.css` files.
2.  **No Inline Scripts.** All JS/TS lives in dedicated script or module files.
3.  **Co-location is King.** One CSS file and one Test file per component/page. Naming mirrors the root file.
4.  **CSS Variables Only.** Never hard-code colors, fonts, or spacing (`rem`/`px`) values.
5.  **One-Way Logic Flow.** `View → Hook/Script → Service → API`. Never skip layers.
6.  **Strict Env Handling.** Environment variables go in `.env`. Never access `process.env` or `import.meta.env` directly in components. Route them through a central `config.js` or `constants.ts` (ideally validated with Zod).

---

## 1️⃣ `/html+js+css` — Vanilla Structure

For lightweight, zero-build or minimal-build static sites.

```text
project/
├── public/                    # Static assets (images, fonts, favicon)
├── src/
│   ├── pages/                 # HTML entry points — one file per page
│   ├── styles/
│   │   ├── globals.css        # Reset + CSS variables ONLY
│   │   ├── layout.css         # Structural utilities (.container, .grid)
│   │   └── index.css          # Page-specific styles
│   ├── scripts/
│   │   ├── main.js            # Entry point (DOMContentLoaded)
│   │   └── utils.js           # Pure helpers: qs(), initApp()
│   └── components/            # Reusable HTML snippets loaded via JS
├── jsconfig.json              # IntelliSense + checkJs
└── README.md
```

### Workflow Rules:

- `globals.css` holds `:root` variables. Never put page-specific styles here.
- All `<script>` tags must use `type="module"`.
- No anonymous inline event listeners. Delegate to named functions in `utils.js` or specific feature modules.
- Use `vite` as the dev server (replaces `live-server` for HMR + build support).

---

## 2️⃣ `/react+vite` — React SPA Structure

For rich, client-side rendered single-page applications.

```text
src/
├── pages/Home/                # Route-level view
│   ├── Home.jsx
│   ├── Home.css               # Co-located CSS
│   └── Home.test.jsx          # Co-located tests
├── components/Navbar/         # Reusable UI components
├── layouts/                   # Page wrappers (e.g., MainLayout, AuthLayout)
├── services/                  # API logic ONLY (axios/fetch calls, no React)
├── hooks/                     # Custom hooks (manage state, call services)
├── utils/                     # Pure JS helpers (no React, no side-effects)
├── globals/
│   ├── variables.css          # CSS custom properties
│   ├── reset.css              # Modern CSS reset
│   ├── globals.css            # @imports reset + variables
│   └── config.js              # env mappings (APP_NAME, API_URL)
├── test/
│   └── setup.js               # Testing library setup
├── router.jsx                 # createBrowserRouter logic
└── main.jsx                   # ReactDOM.render entry point
```

### Workflow Rules:

- Use `@/` absolute imports everywhere. No `../../` directory climbing. Requires `jsconfig.json` in the project root.
- Components **own** their CSS and Tests. They live side-by-side in the component folder.
- `services/` is the only layer permitted to call `axios` or `fetch`.
- **Testing:** Use `vitest` + `@testing-library/react`. Co-locate `.test.jsx` files next to their components.
- **Linting:** ESLint + Prettier are configured via `.eslintrc.cjs` and `.prettierrc`.
- **State Management:** Use local state (`useState`) by default. Use Context for theme/auth. Use global stores (Zustand) only when prop-drilling exceeds 3 levels.

---

## 3️⃣ `/next.js` — App Router Full-Stack Structure

For enterprise-grade, Server-Side Rendered (SSR) applications.

```text
src/
├── app/                       # Routing layer ONLY
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home route
│   ├── globals.css            # Reset + global variables
│   ├── (marketing)/           # Route groups (public)
│   ├── (dashboard)/           # Route groups (protected)
│   └── api/                   # Route Handlers (Edge/Serverless APIs)
├── components/
│   ├── ui/                    # Dumb primitives (Button, Input, Modal)
│   └── layout/                # Smart layout pieces (Navbar, Sidebar)
├── features/auth/             # Domain-driven feature groupings
│   ├── components/
│   ├── hooks/
│   ├── actions.ts             # Server Actions (Mutations)
│   ├── service.ts             # Data Fetching (Queries)
│   └── types.ts
├── lib/                       # Shared pure utilities
│   ├── fetcher.ts
│   ├── env.ts                 # Zod validated env variables
│   └── constants.ts
├── hooks/                     # Global cross-feature hooks
├── store/                     # Global state (Zustand)
└── types/                     # Global TS interfaces/enums
```

### Workflow Rules:

- `app/` is for routing. No business logic in `page.tsx`. Delegate to features.
- Default to **Server Components**. Add `"use client"` only at the lowest possible leaf node.
- Data Mutations use **Server Actions** (`actions.ts`). Data Fetching uses Next.js native `fetch` inside `service.ts` or Server Components.
- **Features** (`features/`) must be strictly self-contained. A feature should not import from another feature's internal folders.
- **Environment variables** must be validated with Zod in `lib/env.ts`.

---

## 🏷️ Naming Conventions

| Item                 | Convention                | Example                      |
| :------------------- | :------------------------ | :--------------------------- |
| Page / Component     | PascalCase                | `ProductList.jsx`            |
| CSS / Test file      | PascalCase (mirrors file) | `ProductList.css`            |
| Hook file            | camelCase, use prefix     | `useAuth.ts`                 |
| Service / Util / Lib | camelCase                 | `apiClient.js`, `fetcher.ts` |
| Feature folder       | camelCase                 | `features/auth/`             |
| CSS class            | kebab-case                | `.product-list`              |
| CSS Custom Property  | `--kebab-case`            | `--color-primary`            |
| Next.js App routes   | lowercase, specific names | `page.tsx`, `layout.tsx`     |

---

## 🎨 Global CSS Token Standard

All workflows share the same CSS variable architecture. Define these in your root CSS file. Do not use magic numbers or hardcoded hex codes.

```css
:root {
  /* Colors */
  --color-primary: #6366f1;
  --color-bg: #ffffff;
  --color-text: #111827;
  --color-subtle: #6b7280;

  /* Typography */
  --font-sans: system-ui, -apple-system, sans-serif;

  /* Spacing & Radii */
  --spacing-md: 1rem;
  --radius-sm: 0.375rem;

  /* Animation */
  --transition-default: all 0.2s ease-in-out;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f172a;
    --color-text: #f8fafc;
  }
}
```

---

## 🔀 Git & Commit Standards

All projects use **Conventional Commits** for clear, parseable commit history.

### Commit Format

```
<type>(<scope>): <short description>
```

### Types

| Type       | When to Use                                |
| :--------- | :----------------------------------------- |
| `feat`     | New feature or capability                  |
| `fix`      | Bug fix                                    |
| `refactor` | Code restructuring without behavior change |
| `style`    | CSS / formatting (no logic changes)        |
| `docs`     | Documentation updates                      |
| `chore`    | Tooling, config, dependency updates        |
| `test`     | Adding or modifying tests                  |

### Rules

- Write in **imperative mood**: `feat: add user search`, not `feat: added user search`.
- Scope is optional but encouraged: `fix(auth): handle expired tokens`.
- Keep the subject line under 72 characters.

---

## ♿ Accessibility (a11y) Rules

Every Achira project must meet baseline accessibility standards:

1.  **Semantic HTML First.** Use `<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`, `<section>`, `<article>` for structure. Never use `<div onClick>` as a button substitute.
2.  **Alt Text on All Images.** Every `<img>` must have a meaningful `alt` attribute. Decorative images use `alt=""`.
3.  **ARIA Labels.** Interactive elements without visible text must have `aria-label` or `aria-labelledby`.
4.  **Color Contrast.** Maintain a minimum contrast ratio of **4.5:1** for normal text and **3:1** for large text (WCAG AA).
5.  **Keyboard Navigation.** All interactive elements must be reachable and operable via keyboard (Tab, Enter, Escape).
6.  **Focus Indicators.** Never remove `outline` on focused elements without providing a visible alternative.

---

## ⚡ Performance Guidelines

1.  **Lazy Load Images.** Use `loading="lazy"` on all below-the-fold `<img>` tags.
2.  **Code Splitting (React / Next.js).** Use `React.lazy()` + `Suspense` for route-level splitting in React. Next.js handles this automatically via the App Router.
3.  **Memoize Expensive Computations.** Use `useMemo` for complex calculations and `useCallback` for stable function references passed as props.
4.  **Minimize Re-renders.** Lift state down, not up. Only the component that owns the state should re-render.
5.  **Optimize Fonts.** Use `font-display: swap` and limit font weights/styles. Prefer system fonts or WOFF2 format.
6.  **Avoid Layout Shifts.** Always set explicit `width` and `height` on images and media to prevent CLS.

---

## 🛠️ Developer Experience (DX)

### Recommended VS Code Setup

Add a `.vscode/settings.json` to each project for consistent DX across team members:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "files.associations": {
    "*.css": "css"
  }
}
```

### Recommended Extensions

| Extension       | Purpose                           |
| :-------------- | :-------------------------------- |
| ESLint          | Lint JS/JSX/TS                    |
| Prettier        | Auto-format on save               |
| CSS Peek        | Navigate to CSS class definitions |
| Auto Rename Tag | Sync HTML/JSX tag renames         |
| Error Lens      | Inline display of errors          |

---

## 🚦 Universal Do / Don't

| ✅ DO                                                      | ❌ DON'T                                                |
| :--------------------------------------------------------- | :------------------------------------------------------ |
| Co-locate CSS and Test files next to their components      | Scatter styles/tests across random global folders       |
| Use CSS variables (`var(--token)`) for styling             | Hard-code `#6366f1` or `16px` inside a component CSS    |
| Use absolute paths (`@/components/...`)                    | Use relative paths deeper than one level (`../../../`)  |
| Keep Pages thin; delegate business logic to hooks/features | Write API calls or heavy logic directly inside a View   |
| Route env variables through a central, typed config file   | Access `import.meta.env` / `process.env` directly in UI |
| Enforce strict Single Responsibility per hook/function     | Mix unrelated state/logic into a massive "God hook"     |
| Separate Server Actions/API calls from UI presentation     | Mix database queries directly into client components    |
| Use semantic HTML and ARIA attributes                      | Use `<div>` for everything and ignore keyboard access   |
| Use Conventional Commits for every commit                  | Write vague commits like "fix stuff" or "update"        |
