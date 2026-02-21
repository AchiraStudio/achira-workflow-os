---
description: Scaffold a mature, scalable React + Vite project with Absolute Imports, React Router, and a Service-oriented architecture.
---

> 🔗 Skill: .achira/core/skills/web-expert

// turbo-all

## 1. Create the Vite project

```
npx -y create-vite@latest ./ --template react
```

## 2. Install scalable architecture dependencies

```
npm install axios lucide-react react-router-dom
npm install -D eslint prettier eslint-config-prettier vitest @testing-library/react @testing-library/jest-dom jsdom
```

## 3. Configure Absolute Imports (@)

### vite.config.js

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
});
```

### jsconfig.json

Add this to the project root so VS Code resolves `@/` imports:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

## 4. Create directory structure

```
mkdir src/pages src/components src/layouts src/hooks src/services src/utils src/globals src/styles src/types src/test
```

## 5. Global CSS Architecture

### src/globals/variables.css

```css
:root {
  --color-primary: #6366f1;
  --color-bg: #ffffff;
  --color-text: #0f172a;
  --transition-default: all 0.2s ease;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f172a;
    --color-text: #f8fafc;
  }
}
```

### src/globals/reset.css

```css
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
body {
  font-family: system-ui;
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
}
img {
  max-width: 100%;
  display: block;
}
button {
  cursor: pointer;
}
```

### src/globals/globals.css

```css
@import "./variables.css";
@import "./reset.css";
```

## 6. Layout & Router Setup

### src/layouts/MainLayout.jsx

```jsx
export default function MainLayout({ children }) {
  return <div className="main-layout">{children}</div>;
}
```

### src/router.jsx

```jsx
import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home/Home";

export const router = createBrowserRouter([{ path: "/", element: <Home /> }]);
```

### src/main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./globals/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
```

## 7. Folder Philosophy Pattern

### src/pages/Home/Home.jsx

```jsx
import "./Home.css";
import MainLayout from "@/layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="home-page">
        <h1>Home</h1>
      </div>
    </MainLayout>
  );
}
```

### src/pages/Home/Home.css

```css
.home-page {
  padding: 2rem;
}
```

## 8. Services Layer

### src/services/apiClient.js

```javascript
import axios from "axios";
import { API_BASE_URL } from "@/globals/config";

export const apiClient = axios.create({ baseURL: API_BASE_URL });
```

## 9. Environment setup

### .env.example

```
VITE_APP_ENV=development
VITE_API_URL=
VITE_ENABLE_ANALYTICS=false
```

### src/globals/config.js

```javascript
export const APP_NAME = "Achira Project";
export const API_BASE_URL = import.meta.env.VITE_API_URL || "";
```

## 10. Testing Setup

### src/test/setup.js

```javascript
import "@testing-library/jest-dom";
```

### src/pages/Home/Home.test.jsx

```jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./Home";

describe("Home", () => {
  it("renders the heading", () => {
    render(<Home />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
```

Add this to `package.json` scripts:

```json
"scripts": {
  "test": "vitest"
}
```

## 11. Linter & Formatter Config

### .eslintrc.cjs

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "detect" } },
  rules: {
    "react/prop-types": "off",
  },
};
```

### .prettierrc

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100
}
```

## 12. Clean up & Execute

- Remove `src/App.css`, `src/index.css`, `src/App.jsx`.
- Run `npm run dev`.
