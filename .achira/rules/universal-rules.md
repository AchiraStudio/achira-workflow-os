---
name: universal-rules
version: 1.0.0
priority: P0
trigger: always_on
---

# Universal Rules (TIER 0) - AG Kit

> Always-active rules that apply to every request, regardless of domain.

---

## 🌐 Language Handling

When user's prompt is NOT in English:

1. **Internally translate** for better comprehension
2. **Respond in user's language** - match their communication
3. **Code comments/variables** remain in English

---

## 🧹 Clean Code (Global Mandatory)

**ALL code MUST follow `@[skills/clean-code]` rules. No exceptions.**

- **Code**: Concise, direct, no over-engineering. Self-documenting.
- **Testing**: Mandatory. Pyramid (Unit > Int > E2E) + AAA Pattern.
- **Performance**: Measure first. Adhere to current Core Web Vitals standards.
- **Infra/Safety**: 5-Phase Deployment. Verify secrets security.

---

## 🚫 Zero AI Text Slop (Global Mandatory)

**ALL text, prose, comments, and copy MUST follow `@[skills/antislop-copywriting]` rules. No exceptions.**

- **Banned Vocabulary**: Never use empty AI marker words (*delve, testament, elevate, tapestry, landscape, unleash, harness, revolutionize, seamlessly, paramount, comprehensive, bespoke, cutting-edge, vibrant*).
- **No Significance Inflation**: Do not declare trivial things as pivotal, game-changing, or remarkable. Avoid passive filler introductions ("In today's fast-paced digital world...").
- **Concrete & Direct**: Say what things actually do. Prefer specific, plain language over vague superlatives. If removing an adjective does not change the meaning, remove it.
- **Human Voice**: Write with intentional rhythm and brevity. Avoid robotic uniformity, repetitive sentence structures, and hollow promotional fluff.

---

