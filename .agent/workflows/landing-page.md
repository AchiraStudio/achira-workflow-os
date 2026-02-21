---
description: Scaffold a high-converting, SEO-optimized marketing landing page.
---

> 🔗 Skill: .achira/core/skills/web-expert

// turbo-all

## 1. Stack Check

Ask the user if they want just standard HTML/CSS or React/Vite.
If HTML, follow the vanilla structure. If React, scaffold via Vite.
For this default path, we assume **Next.js static export** (fastest delivery, best SEO).

```bash
npx -y create-next-app@latest ./ --typescript --tailwind --app --src-dir --import-alias "@/*" --use-npm
```

## 2. Apply SEO Fundamentals

Generate a dynamic `src/app/layout.tsx` focusing heavily on:

- Next.js Built-in `Metadata` object.
- Valid OG (Open Graph) and Twitter tag setup.
- `robots.txt` and `sitemap.xml` dynamic generation.
- Semantic HTML tags (`<header>`, `<main>`, `<section>`, `<footer>`).

## 3. Apply Design Guidelines

1. Enforce high-contrast text ratios for accessibility.
2. Use modern spacing scales (e.g. Tailwind `space-y-4` or clean Flex setups).
3. Primary CTA should be immediately visible above the fold.
4. Social proof section (Testimonials, Logo clouds).

## 4. Architecture Map

```
src/
├── app/
│   ├── layout.tsx         # Global fonts, metadata, tracking scripts
│   ├── page.tsx           # Assembled landing page
│   ├── sitemap.ts         # SEO: Dynamic sitemap
│   └── robots.txt         # SEO: Block bad bots
├── components/
│   ├── HeroSection.tsx
│   ├── FeaturesGrid.tsx
│   ├── SocialProof.tsx
│   └── Footer.tsx
└── lib/
    └── utils.ts
```
