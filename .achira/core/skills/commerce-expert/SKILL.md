---
name: commerce-expert
description: Master rules for Shopify development, Stripe, and Payment Integration.
version: 1.0
---

# 🛒 Commerce Expert Core Rules

This skill directs development for e-commerce logic, Shopify ecosystems, and payment gateways.

## 1. Shopify Development

- **App/Theme Separation**: Understand the boundaries between a Shopify App (custom backend/logic), an Extension (embedded UI), and a Theme (Liquid storefront).
- **Polaris UI**: For Shopify Admin apps, strictly use the Shopify Polaris design system.
- **Liquid Best Practices**: Keep Liquid templates clean, loop efficiently, and defer heavy logic to Shopify APIs or App Proxy.
- **Webhooks**: Always verify HMAC signatures on incoming Shopify webhooks. Handle webhook processing asynchronously.

## 2. Stripe & Payments

- **PCI Compliance**: Never touch raw credit card data. Always use Stripe Elements or Stripe Checkout.
- **Webhooks**: Stripe webhooks must verify the signing secret and be idempotent (handle retries without duplicating actions).
- **Data Model**: Store Stripe Customer IDs and Subscription Statuses locally to avoid API rate limits, but defer to Stripe as the source of truth for billing.
- **Idempotency Keys**: Use idempotency keys on all critical charge or subscription creation API requests to prevent double-charging.
