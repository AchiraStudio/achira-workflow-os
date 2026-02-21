---
description: Scaffold a clean, scalable vanilla HTML + CSS + JavaScript project with clear separation of concerns.
---

// turbo-all

## Philosophy

This workflow enforces a strict separation between structure, style, and behavior.

- **HTML** = Structure only. No inline styles, no inline scripts.
- **CSS** = Styling only. Split by concern: globals, layout, page-specific.
- **JS** = Behavior only. Modular ES modules — one entry point, shared utils.

---

## 1. Create the Project Structure

```
mkdir src
mkdir src/pages
mkdir src/styles
mkdir src/scripts
mkdir src/components
mkdir public
```

Final structure:

```
project/
├── public/
├── src/
│   ├── pages/
│   │   └── index.html
│   ├── styles/
│   │   ├── globals.css
│   │   ├── layout.css
│   │   └── index.css
│   ├── scripts/
│   │   ├── main.js
│   │   └── utils.js
│   └── components/
├── jsconfig.json
├── .gitignore
└── README.md
```

---

## 2. Create `src/pages/index.html`

The entry point. Links all CSS and the JS module. No styles or scripts inline.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Project</title>

    <!-- Global reset + variables -->
    <link rel="stylesheet" href="../styles/globals.css" />
    <!-- Reusable layout utilities -->
    <link rel="stylesheet" href="../styles/layout.css" />
    <!-- Page-specific styles -->
    <link rel="stylesheet" href="../styles/index.css" />
  </head>
  <body>
    <div class="container">
      <h1>Hello World</h1>
    </div>

    <!-- module: enables import/export -->
    <script type="module" src="../scripts/main.js"></script>
  </body>
</html>
```

---

## 3. Create `src/styles/globals.css`

The single source of truth for CSS variables and the global reset.
No component-specific styles go here.

```css
/* Modern Reset */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

button {
  cursor: pointer;
}

/* Design Tokens */
:root {
  --color-primary: #6366f1;
  --color-bg: #ffffff;
  --color-text: #111827;
  --color-subtle: #6b7280;
  --font-sans: system-ui, -apple-system, sans-serif;
  --transition-default: all 0.2s ease;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f172a;
    --color-text: #f8fafc;
  }
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
}
```

---

## 4. Create `src/styles/layout.css`

Shared structural utilities across all pages. Not page-specific.

```css
/* Centered content wrapper */
.container {
  width: min(1100px, 90%);
  margin: 0 auto;
  padding: 2rem 0;
}

/* Utility layout classes */
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid {
  display: grid;
}
.grid-2 {
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
.grid-3 {
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
```

---

## 5. Create `src/styles/index.css`

Styles for the index page only. Each page gets its own file.

```css
/* index page styles */
h1 {
  color: var(--color-primary);
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
```

---

## 6. Create `src/scripts/utils.js`

Pure, reusable helper functions. No DOM access. No side effects.

```javascript
/**
 * One-call app initializer. Add further calls here as the app grows.
 */
export function initApp() {
  console.log("[App] Initialized");
}

/**
 * Convenience wrapper: returns a single element or null.
 * @param {string} selector
 * @returns {Element|null}
 */
export function qs(selector) {
  return document.querySelector(selector);
}

/**
 * Convenience wrapper: returns a NodeList.
 * @param {string} selector
 * @returns {NodeList}
 */
export function qsAll(selector) {
  return document.querySelectorAll(selector);
}
```

---

## 7. Create `src/scripts/main.js`

The single JS entry point. Imports utils, hooks into `DOMContentLoaded`.
Page-specific logic starts here, but delegates to modules.

```javascript
import { initApp } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
```

---

## 8. Create `jsconfig.json`

Enable IntelliSense, type-checking via JSDoc, and module resolution in VS Code.

```json
{
  "compilerOptions": {
    "checkJs": true,
    "moduleResolution": "node",
    "target": "ES2020",
    "module": "ES2020"
  },
  "include": ["src/**/*.js"],
  "exclude": ["node_modules"]
}
```

---

## 9. Create `.gitignore`

```
node_modules/
dist/
.DS_Store
*.log
.env
.env.local
```

---

## 10. Create `README.md`

```markdown
# Project Name

A clean HTML + CSS + JS project.

## Structure

| Folder            | Purpose                                                                             |
| ----------------- | ----------------------------------------------------------------------------------- |
| `src/pages/`      | HTML entry points — one file per page                                               |
| `src/styles/`     | `globals.css` (design tokens), `layout.css` (utilities), `page.css` (page-specific) |
| `src/scripts/`    | `main.js` (entry), `utils.js` (shared helpers)                                      |
| `src/components/` | Reusable HTML snippets (loaded/injected via JS if needed)                           |
| `public/`         | Static assets: images, fonts, favicon                                               |

## Rules

- No inline CSS
- No inline scripts
- Use CSS variables from `globals.css`
- Use `type="module"` on all script tags
- One CSS file per page (mirroring `src/pages/`)

## Dev Server
```

npm run dev

```

```

---

## 11. Initialize npm and Install Dev Server

```
npm init -y
npm install -D vite
```

Add to `package.json`:

```json
"scripts": {
  "dev": "vite src/pages --port=3000 --open",
  "build": "vite build",
  "preview": "vite preview"
}
```

Run:

```
npm run dev
```

---

## Scaling Rules

As the project grows, follow this pattern:

```
src/
├── pages/
│   ├── index.html         ← each page has its own HTML
│   ├── about.html
│   └── contact.html
├── styles/
│   ├── globals.css        ← shared always
│   ├── layout.css         ← shared always
│   ├── index.css          ← page-specific
│   ├── about.css
│   └── contact.css
├── scripts/
│   ├── main.js            ← one per page (or shared entry + conditionals)
│   └── utils.js
└── components/            ← HTML snippets injected via fetch() or JS
```

- Never let `globals.css` accumulate page-specific rules.
- Never use `<style>` tags inside HTML files.
- Never write logic inside event listeners — delegate to named functions.
