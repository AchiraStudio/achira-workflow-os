---
description: Scaffold a Shopify project — routing to app, extension, or theme based on the user's goal.
---

> 🔗 Skill: .achira/core/skills/commerce-expert

// turbo-all

## 1. Environment Check

```bash
npm install -g @shopify/cli@latest
```

## 2. Routing Logic

Before acting, clarify what the user wants to build:

1. **Merchant tools / External integrations?** → Build an **App**
   - Command: `shopify app init`
2. **Checkout/Admin/POS UI customizations?** → Build an **Extension**
   - Command: `shopify app generate extension`
3. **Storefront design / Product pages?** → Build a **Theme**
   - Command: `shopify theme init`

## 3. Shopify App Scaffold

If building an app:

```bash
shopify app init --template remix
```

## 4. Extension Scaffold

If building an extension:

```bash
shopify app generate extension
```

## 5. Security Best Practices

- Use GraphQL over REST for new development
- Request only fields you need (reduces query cost)
- Always verify webhook HMAC signatures before processing
- Validate OAuth state parameter to prevent CSRF
