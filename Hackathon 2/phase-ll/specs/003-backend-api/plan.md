# Implementation Plan: Backend & API for Todo Application

**Branch**: `003-backend-api` | **Date**: 2026-02-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-backend-api/spec.md`

## Summary

Build a secure RESTful API backend using FastAPI and SQLModel ORM that provides CRUD operations for todo tasks with JWT-based authentication and user isolation. The backend will integrate with Neon Serverless PostgreSQL and enforce strict user ownership at the database query level.

## Technical Context

**Language/Version**: Python 3.11+  
**Primary Dependencies**: FastAPI 0.104+, SQLModel 0.14+, Pydantic 2.0+, PyJWT 2.8+, psycopg2-binary 2.9+, python-dotenv 1.0+  
**Storage**: Neon Serverless PostgreSQL (connection pooling via psycopg2)  
**Testing**: pytest 7.4+, httpx 0.25+ (for async API testing)  
**Target Platform**: Linux server (Docker containerizable)  
**Project Type**: Web backend API  
**Performance Goals**: <500ms response time for requests with <100 tasks, handle 100 concurrent requests  
**Constraints**: JWT verification on every protected endpoint, user isolation enforced at query level, stateless backend, parameterized queries only  
**Scale/Scope**: Multi-user application, ~6 API endpoints, 2 database tables (users, tasks)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Functional Completeness
- ✅ **PASS**: All 5 CRUD operations (Create, Read, Update, Delete, Toggle) specified in requirements
- ✅ **PASS**: Complete API endpoints defined for all user stories
- ✅ **PASS**: No placeholder functionality - all endpoints fully specified

### Principle II: Security-First
- ✅ **PASS**: JWT verification required on every protected endpoint (FR-006)
- ✅ **PASS**: User isolation enforced at database query level (FR-008)
- ✅ **PASS**: Secrets stored in environment variables (FR-030)
- ✅ **PASS**: 401 Unauthorized for invalid/missing tokens (FR-009)
- ✅ **PASS**: Parameterized queries to prevent SQL injection (FR-026)

### Principle III: Reliability & Correctness
- ✅ **PASS**: Input validation specified (FR-011, FR-012, FR-013)
- ✅ **PASS**: Error handling covers all failure modes (401, 404, 400, 500)
- ✅ **PASS**: Consistent error response format (FR-022)
- ✅ **PASS**: Task ownership enforcement (FR-010)

### Principle IV: Responsiveness
- ⚠️ **N/A**: Backend API - responsiveness handled by frontend layer

### Principle V: Spec-Driven Development
- ✅ **PASS**: Spec.md created and validated before planning
- ✅ **PASS**: Following Spec-Kit workflow (Spec → Plan → Tasks → Implementation)
- ✅ **PASS**: Will use specialized agents (fastapi-backend-architect, neon-db-architect, auth-security-architect)

**Gate Status**: ✅ PASS - All applicable principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/003-backend-api/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
│   ├── tasks-api.md     # Task CRUD endpoints OpenAPI spec
│   └── error-responses.md # Error response formats
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Environment configuration
│   ├── database.py          # Database connection and session management
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py          # User SQLModel
│   │   └── task.py          # Task SQLModel
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── task.py          # Pydantic request/response schemas
│   │   └── error.py         # Error response schemas
│   ├── middleware/
│   │   ├── __init__.py
│   │   └── auth.py          # JWT verification middleware
│   ├── routers/
│   │   ├── __init__.py
│   │   └── tasks.py         # Task CRUD endpoints
│   └── utils/
│       ├── __init__.py
│       ├── jwt.py           # JWT token verification utilities
│       └── logging.py       # Logging configuration
├── tests/
│   ├── __init__.py
│   ├── conftest.py          # pytest fixtures
│   ├── test_tasks.py        # Task endpoint tests
│   └── test_auth.py         # Authentication tests
├── .env.example             # Environment variables template
├── requirements.txt         # Python dependencies
└── README.md                # Backend setup instructions
```

**Structure Decision**: Web application backend structure selected. The backend/ directory contains the FastAPI application with clear separation of concerns: models (SQLModel entities), schemas (Pydantic validation), middleware (JWT auth), routers (API endpoints), and utilities (JWT verification, logging). Tests are organized by feature area.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - all constitution principles satisfied.
