---
description: Scaffold a scalable, production-ready Next.js App Router project with feature-based architecture.
---

> 🔗 Skill: .achira/core/skills/web-expert

// turbo-all

## Goals

- App Router for routing + layouts
- Feature-based domain grouping
- Clear Server vs. Client Component boundaries
- Scalable from side project to SaaS

### Server vs Client Component Rules

```
Does it need...?
│
├── useState, useEffect, onClick, window/document
│   └── Client Component ('use client')
│
├── Direct data fetch, env variables, no interactivity
│   └── Server Component (default, no directive)
│
└── Both?
    └── Split: Server parent passes data to Client child
```

---

## 1. Create the Next.js Project

```
npx -y create-next-app@latest ./ --typescript --eslint --tailwind=false --app --src-dir --import-alias "@/*" --use-npm
```

---

## 2. Install Core Dependencies

```
npm install axios lucide-react zod zustand
```

---

## 3. Create the Full Directory Structure

```
mkdir src/components/ui src/components/layout src/components/feature
mkdir src/features/auth src/features/user
mkdir src/lib src/hooks src/services src/store src/styles src/types
```

Full structure:

```
src/
├── app/                        # Next.js App Router (routing only)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── (marketing)/            # Public-facing route group
│   │   └── page.tsx
│   ├── (dashboard)/            # Authenticated route group
│   │   └── layout.tsx
│   └── api/                    # Route handlers
│
├── components/                 # Shared UI
│   ├── ui/                     # Primitives: Button, Card, Modal
│   ├── layout/                 # Navbar, Sidebar, Footer
│   └── feature/                # Composed feature-specific UI
│
├── features/                   # Feature-based domain logic
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── actions.ts          # Server Actions (Mutations)
│   │   ├── service.ts
│   │   └── types.ts
│   └── user/
│       ├── components/
│       ├── hooks/
│       ├── service.ts
│       └── types.ts
│
├── lib/                        # Shared utilities (no external deps)
│   ├── fetcher.ts
│   ├── constants.ts
│   ├── validators.ts
│   └── env.ts                  # Zod-validated environment variables
│
├── hooks/                      # Global shared React hooks
├── services/                   # External API integrations
├── store/                      # Global state (Zustand)
├── styles/                     # CSS Modules for complex, shared styles
└── types/                      # Global TypeScript type definitions
```

---

## 4. Set Up `src/app/globals.css`

Replace default globals with a clean token-based reset.

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

:root {
  --color-primary: #6366f1;
  --color-bg: #ffffff;
  --color-text: #111827;
  --font-sans: var(--font-geist-sans), system-ui, sans-serif;
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

## 5. Create Root Layout `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My App",
  description: "Generated with achira-wf",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

## 6. Create Home Page `src/app/page.tsx`

```tsx
export default function HomePage() {
  return (
    <main>
      <h1>Hello from Next.js App Router</h1>
    </main>
  );
}
```

---

## 7. Set Up Example Feature (`auth`)

### `src/features/auth/types.ts`

```ts
export interface User {
  id: string;
  email: string;
  name: string;
}
```

### `src/features/auth/service.ts`

```ts
import axios from "axios";
import type { User } from "./types";

export async function getMe(): Promise<User> {
  const { data } = await axios.get("/api/auth/me");
  return data;
}
```

### `src/features/auth/hooks/useUser.ts`

```ts
"use client";
import { useState, useEffect } from "react";
import { getMe } from "../service";
import type { User } from "../types";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
```

---

## 8. Set Up Shared Lib

### `src/lib/constants.ts`

```ts
export const APP_NAME = "My App";
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
```

### `src/lib/fetcher.ts`

```ts
export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
  return res.json();
}
```

### `src/lib/env.ts`

Validate environment variables at build time with Zod. Import this in `layout.tsx` or a server-only module so it runs at startup.

```ts
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().optional().default(""),
  NEXT_PUBLIC_APP_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
});

export const env = envSchema.parse(process.env);
```

---

## 9. Create `.env.example`

```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_ENV=development
DATABASE_URL=
```

---

## 10. CSS Strategy Note

| Location                  | Use For                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------- |
| `src/app/globals.css`     | CSS reset, CSS custom properties (`:root`), global body styles                          |
| `src/styles/*.module.css` | Complex, shared styles used across multiple components (e.g., form layouts, card grids) |
| Co-located `.module.css`  | Component-specific styles that live next to their component file                        |

**Rule:** Default to co-located CSS Modules. Only use `src/styles/` for truly cross-cutting layouts that don't belong to any single component.

---

## 11. Start the Dev Server

```
npm run dev
```

---

## Component Guidelines

| Rule                                      | Reason                                        |
| ----------------------------------------- | --------------------------------------------- |
| Default to **Server Components**          | Better performance, less JS sent to client    |
| Use `"use client"` only at the leaf level | Keeps SSR benefits higher in the tree         |
| No business logic in `page.tsx`           | Pages are wiring only — delegate to features  |
| Services handle all network calls         | Hooks are for state/effects, not fetching raw |

---

## Scalability Path

| Stage      | Add                                                      |
| ---------- | -------------------------------------------------------- |
| Small      | `app/`, `components/`, `lib/`                            |
| Growing    | Introduce `features/`, `services/`, feature-scoped hooks |
| Enterprise | Strict feature boundaries, API abstraction, `store/`     |
