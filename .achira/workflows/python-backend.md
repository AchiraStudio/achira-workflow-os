---
description: Scaffold a high-performance Python backend (FastAPI preferred).
---

> 🔗 Skill: .achira/core/skills/backend-expert

// turbo-all

## 1. Project Initialization

We use `uv` for modern, blazingly fast package management.

```bash
uv init
```

## 2. Dependencies

```bash
uv add fastapi uvicorn pydantic sqlalchemy asyncpg
uv add --dev pytest ruff
```

## 3. Directory Structure

```
src/
├── app/
│   ├── api/          # Endpoints and routers
│   ├── core/         # Config, security
│   ├── models/       # Database models
│   ├── schemas/      # Pydantic validation schemas
│   ├── services/     # Business logic
│   └── main.py       # FastAPI application entry point
└── tests/
```

## 4. Quality Rules

1.  **Format and Lint:** Always run `uv run ruff check` and `uv run ruff format` before committing.
2.  **Type Hints:** Use strict type hinting everywhere (`-> ReturnType:` and `var: Type`).
3.  **Async/Await:** All IO-bound operations (db, network) must be `async def`. Do not block the event loop.
4.  **Schema Validation:** Never trust client input. Define strict Pydantic schemas.

## 5. Entry point (`src/app/main.py`)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Achira Backend API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}
```

## 6. Run Server

```bash
uv run uvicorn app.main:app --reload
```
