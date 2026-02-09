---
id: 001
title: Create Project Constitution
stage: constitution
date: 2026-02-09
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: 1-todo-frontend-ui
user: user
command: /sp.constitution
labels: ["constitution", "governance", "principles", "hackathon-phase-ii"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---

## Prompt

/sp.constitution Project: Hackathon Phase II – Todo Full-Stack Web Application

Core Principles:
- Accuracy: All features and API behaviors must be implemented exactly as defined in specs.
- Clarity: Specifications and implementations must be clear for all team members and Claude Code agents.
- Consistency: Ensure consistent authentication, API responses, database schema, and UI patterns.
- Security: Follow JWT-based authentication and user isolation for all endpoints.
- Reproducibility: Implementations must work reliably across frontend, backend, and database layers.
- Usability: Frontend must be responsive and intuitive for all devices.
- Spec-driven: All implementations are based on structured specifications in /specs folder.

Key Standards:
- All endpoints require JWT token verification; unauthorized requests must return 401.
- Frontend API calls must include JWT in `Authorization` header.
- Backend routes must filter data based on authenticated user ID.
- Database interactions must follow SQLModel ORM conventions and Neon Serverless PostgreSQL best practices.
- RESTful conventions: all routes under `/api/`, proper HTTP methods, Pydantic models for request/response, and consistent error handling.
- Specs must be referenced using Spec-Kit Plus conventions: `@specs/features/...`, `@specs/api/...`, `@specs/database/...`, `@specs/ui/...`.
- Monorepo organization must follow the defined structure with CLAUDE.md files guiding Claude Code across frontend and backend.
- UI components must follow responsive design, Tailwind CSS conventions, and accessibility best practices.

Constraints:
- Technology Stack:
  - Frontend: Next.js 16+ (App Router), TypeScript, Tailwind CSS
  - Backend: Python FastAPI, SQLModel ORM
  - Database: Neon Serverless PostgreSQL
  - Authentication: Better Auth with JWT
  - Spec-driven: Claude Code + Spec-Kit Plus
- Implement all basic-level features for Phase II web application:
  - Task CRUD operations
  - User authentication
  - Filtering, sorting, and completion toggling
- Monorepo structure:
  - /specs/ for all specifications
  - /frontend and /backend folders with CLAUDE.md guidelines
  - .spec-kit/config.yaml for Spec-Kit Plus configuration
- All endpoints, database queries, and UI components must strictly adhere to spec-defined rules.
- All work must be automated via Claude Code; no manual coding allowed.
- Use environment variables for secrets and configuration (e.g., BETTER_AUTH_SECRET, DATABASE_URL).

Success Criteria:
- Full-stack features work end-to-end according to specs
- JWT authentication enforced; user isolation maintained
- All API endpoints return correct responses and handle errors properly
- Database maintains integrity, indexes, and relationships as defined
- Frontend is responsive, accessible, and consistent with component specs
- Spec-Kit Plus workflow fully followed: write/update spec → implement via Claude Code → validate
- Passes QA and integration testing using Integration Tester Agent
- Monorepo organization allows Claude Code to navigate, edit, and implement across frontend and backend seamlessly

## Response snapshot

Created the project constitution v1.0.0 at `.specify/memory/constitution.md` with the following structure:

**Core Principles (7 principles)**:
1. Accuracy - Exact implementation of specifications
2. Clarity - Unambiguous specs and implementations
3. Consistency - Uniform patterns across all layers
4. Security (NON-NEGOTIABLE) - JWT authentication and user isolation
5. Reproducibility - Reliable cross-environment operation
6. Usability - Responsive and accessible frontend
7. Spec-Driven Development - Structured specification workflow

**Technology Stack & Constraints**:
- Approved stack table with Next.js 16+, FastAPI, SQLModel, Neon PostgreSQL, Better Auth
- Mandatory Phase II features: authentication, task CRUD, filtering, sorting, completion toggling
- Monorepo structure with /specs, /frontend, /backend, /history, /.specify
- Required environment variables documented

**Development Standards**:
- API conventions (RESTful, JWT verification, error format)
- Database standards (SQLModel ORM, indexes, migrations)
- Frontend standards (App Router, TypeScript, Tailwind, accessibility)
- Spec-Kit Plus workflow (specify → plan → tasks → implement)
- Specialized agent usage rules

**Governance**:
- Amendment process with versioning policy (semantic versioning)
- Compliance review requirements
- Enforcement rules for PRs and complexity violations

## Outcome

- ✅ Impact: Established foundational governance document for Hackathon Phase II Todo application with 7 core principles, technology stack constraints, development standards, and governance rules
- 🧪 Tests: No tests required for constitution document
- 📁 Files: Created/updated .specify/memory/constitution.md (v1.0.0)
- 🔁 Next prompts: Begin feature specification with /sp.specify for first feature (e.g., user authentication or task CRUD)
- 🧠 Reflection: Constitution provides clear guardrails for autonomous agent execution with emphasis on security (JWT), spec-driven workflow, and specialized agent delegation

## Evaluation notes (flywheel)

- Failure modes observed: None - constitution created successfully with all placeholders filled
- Graders run and results (PASS/FAIL): PASS - All template validations passed (no unresolved placeholders, proper versioning, dates in ISO format)
- Prompt variant (if applicable): N/A - Initial constitution creation
- Next experiment (smallest change to try): Test constitution compliance during first feature implementation to validate principle enforceability
