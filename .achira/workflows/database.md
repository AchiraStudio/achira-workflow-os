---
description: Guides the LLM and user in designing optimal database schemas, choosing the right tool (Supabase/Postgres vs SQLite), and writing efficient queries.
---

> 🔗 Skill: .achira/core/skills/backend-expert

// turbo-all

## 1. Assessment

Before writing code or schema, ask the user:

- "Are we building a local/embedded tool (SQLite) or a scale-out cloud service (Supabase/Postgres)?"
- "What are the primary query patterns? (Read-heavy, Write-heavy, Full-text search?)"

## 2. Schema Design Principles

1.  **Normalization First:** Normalize to 3NF initially. Denormalize only if read performance becomes a verified bottleneck.
2.  **Naming Conventions:**
    - Tables: `snake_case`, plural (`users`, `orders`).
    - Columns: `snake_case`, singular (`created_at`, `user_id`).
3.  **Data Integrity:**
    - Use strict Data Types.
    - Enforce Foreign Key bounds (`ON DELETE CASCADE` or `RESTRICT`).
    - Use `CHECK` constraints for enumerated values.

## 3. Indexing Strategy

- **Primary Keys:** Create automatically, but strongly prefer `uuid v4` or `bigint` depending on cluster distribution.
- **Foreign Keys:** Always index columns used in `JOIN` paths (e.g. `user_id`).
- **Where Clauses:** Index columns frequently used for filtering or ordering.
- **Avoid Over-indexing:** Every index slows down writes (`INSERT`/`UPDATE`/`DELETE`).

## 4. Query Performance

- Never write `SELECT *`. Always specify exact columns `SELECT id, name`.
- Use `EXPLAIN ANALYZE` on Postgres/Supabase to verify query plans.
- Handle N+1 query problems in the application layer (e.g. via Dataloaders or joined queries).

## 5. Security (Supabase specifically)

If using Supabase, immediately setup Row Level Security (RLS).
Deny access by default:

```sql
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;
```

Grant specific policies afterwards.
