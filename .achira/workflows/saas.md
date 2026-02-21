---
description: Scaffold a full-stack SaaS project using Next.js App Router, Supabase Auth/DB, and Stripe billing.
---

> 🔗 Skill: .achira/core/skills/web-expert
> 🔗 Skill: .achira/core/skills/backend-expert
> 🔗 Skill: .achira/core/skills/commerce-expert

// turbo-all

## 1. Scaffold Next.js + Tailwind

```bash
npx -y create-next-app@latest ./ --typescript --eslint --tailwind --app --src-dir --import-alias "@/*" --use-npm
```

## 2. Install Core Dependencies

```bash
npm install @supabase/ssr @supabase/supabase-js stripe lucide-react clsx tailwind-merge
```

## 3. Configure Supabase Auth

1. Create `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, and `src/lib/supabase/middleware.ts` following the exact `@supabase/ssr` pattern.
2. Hook up `src/middleware.ts` to refresh tokens using Supabase Server Client.

## 4. Setup Stripe

1. Create `src/lib/stripe.ts` initializing the Stripe SDK.
2. Scaffold `src/app/api/webhooks/stripe/route.ts` to listen for `customer.subscription.created`, `updated`, and `deleted` events.

## 5. Environment Variables Structure

### `.env.example`

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

## 6. Directory Map

```
src/
├── app/
│   ├── (auth)/        # Login/Signup forms
│   ├── (dashboard)/   # Protected app routes
│   │   ├── layout.tsx # Checks Supabase session, redirects if unauthorized
│   │   └── page.tsx
│   ├── billing/       # Stripe integrations
│   └── api/
├── components/
│   └── ui/            # Shared primitives
└── lib/
    ├── supabase/      # SSR helpers
    └── stripe.ts      # SDK initialization
```
