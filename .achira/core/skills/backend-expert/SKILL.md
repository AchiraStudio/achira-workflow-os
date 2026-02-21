---
name: backend-expert
description: Master rules for Python (FastAPI), Database Architecture, and Supabase.
version: 1.0
---

# ⚙️ Backend & Data Expert Core Rules

This skill governs backend API development, database schema design, and cloud-native DB services (Supabase).

## 1. Python & FastAPI Pro

- **Type Hinting**: Strict type hinting is mandatory (`-> ReturnType`, `var: Type`).
- **Pydantic v2**: Use `Field` for descriptions and constraints. Prefer `model_validate` and `model_dump`. Optimize serialization with `exclude_unset=True`.
- **Async DB/IO**: Use `async def` for endpoints. Use async database drivers (like `asyncpg`) and ensure connections are awaited.
- **Dependency Injection**: Utilize FastAPI's `Depends` for reusable logic like `get_db` session management, `get_current_user`, and authentication scopes.
- **Error Handling**: Use custom `HTTPException` subclasses or global exception handlers for consistent JSON error responses.

## 2. Node.js & API Architecture

- **Layered Architecture**: Strictly separate Controllers (routing/HTTP), Services (business logic), and Data Access (DB queries).
- **Error Handling**: Use custom `AppError` subclasses. Catch unhandled promise rejections. Centralize error responses to ALWAYS return a standard JSON structure `{ "error": { "code", "message" } }`.
- **Stateless REST**: APIs must be stateless. Use JWTs or secure HttpOnly cookies for session management. Avoid server-side sessions.
- **Pagination & Filtering**: Always implement cursor or offset pagination for list endpoints. Use standardized query params (`?limit=50&offset=0&sort=-created_at`).

## 3. Database Design Principles

- **Normalization**: Start with 3rd Normal Form (3NF). Denormalize only when strictly required for read performance.
- **Integrity**: Enforce referential integrity via Foreign Keys. Use `CHECK` constraints and `ENUM`s.
- **Indexing**: Always index Foreign Keys and columns frequently used in `WHERE` clauses, but avoid over-indexing to preserve write performance.
- **Naming**: `snake_case` plural for tables, `snake_case` singular for columns.

## 3. Supabase Integration

- **Row Level Security (RLS)**: Enable RLS on all tables immediately. Deny access by default, and explicitly grant policies for `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
- **Auth Flow**: Use Supabase SSR (Server-Side Rendering) packages in full-stack frameworks (like Next.js) to securely handle JWTs via cookies.
- **Edge Functions**: Deploy specific intensive or secure backend logic to Supabase Edge Functions (Deno) when full custom backends aren't needed.
