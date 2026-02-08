---
id: 001
title: Create Todo App Constitution
stage: constitution
date: 2026-02-08
surface: agent
model: claude-sonnet-4-5
feature: none
branch: 001-console-todo-app
user: HP I5 6th Gen
command: /sp.constitution
labels: ["constitution", "governance", "principles", "hackathon"]
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

```text
# /sp.constitution

## Project
**Todo Full-Stack Web Application** (Multi-user, Persistent, Secure)

## Core Principles
- **Functional completeness:** All 5 basic features implemented as a web application.
- **Security-first:** JWT-based authentication, user isolation, stateless backend.
- **Reliability & correctness:** API endpoints behave as specified; task ownership enforced.
- **Responsiveness:** Frontend UI works seamlessly across devices (mobile, tablet, desktop).
- **Spec-driven development:** All implementation follows clearly defined specs; no manual coding outside Spec-Kit workflow.

## Key Standards
- RESTful API endpoints implemented for all CRUD operations on tasks.
- Frontend pages built in **Next.js 16+** (App Router) with responsive layout.
- Backend implemented in **FastAPI**, using **SQLModel ORM** and **Neon Serverless PostgreSQL**.
- Authentication fully handled via **Better Auth**, issuing JWT tokens.
- Frontend attaches JWT token to all API requests; backend verifies tokens and enforces user-specific data access.
- Error handling included (401 Unauthorized, 404 Not Found, validation errors).
- Code readability, modularity, and maintainability ensured in both frontend and backend.
- All deliverables tested and verified with automated/manual checks.

## Constraints
- Project must follow **Agentic Dev Stack workflow**: Spec → Plan → Task Breakdown → Implementation.
- Frontend and backend must remain fully decoupled, communicating only via API.
- JWT shared secret must be stored as environment variable (`BETTER_AUTH_SECRET`) in both frontend and backend.
- API endpoints must enforce task ownership strictly.
- UI must be fully responsive and accessible (basic accessibility standards).
- All implementation must be automated via **Claude Code**; no manual coding allowed.

## Key Deliverables
- **Frontend:** Next.js app with responsive UI, JWT integration, Better Auth login/signup, connected to backend APIs.
- **Backend:** FastAPI service with REST endpoints, SQLModel ORM integration, JWT middleware, user isolation enforced.
- **Authentication & Security:** JWT generation and verification, token expiration handling, stateless backend, secure storage of secrets.
- **Testing & Verification:** Functional testing for all endpoints, UI validation, security checks for unauthorized access prevention.

## Success Criteria
- All 5 basic features fully functional via web app.
- Each user can only access their own tasks; user isolation fully enforced.
- JWT tokens correctly generated, transmitted, and verified.
- Frontend fully responsive and accessible.
- API endpoints pass all automated/manual test cases.
- No manual coding outside Spec-Kit workflow; fully spec-driven implementation.
- Project is review-ready for hackathon phase-2 judging.
```

## Response snapshot

Created the project constitution (v1.0.0) at `.specify/memory/constitution.md` with 5 core principles:

1. **Functional Completeness** - All 5 basic features must be fully implemented
2. **Security-First** - JWT authentication, user isolation, stateless backend
3. **Reliability & Correctness** - API contracts enforced, task ownership verified
4. **Responsiveness** - Mobile, tablet, desktop support with adaptive layouts
5. **Spec-Driven Development** - Mandatory workflow: Spec → Plan → Tasks → Implementation

The constitution establishes:
- Technology stack (Next.js 16+, FastAPI, SQLModel, Neon PostgreSQL, Better Auth)
- API standards (RESTful, consistent error format, JWT in Authorization header)
- Security constraints (environment variables for secrets, user ID verification)
- Development constraints (specialized agents for each layer, PHR creation mandatory)
- Quality constraints (responsive UI, task ownership enforcement, user-friendly errors)

All templates verified for compatibility:
- ✅ plan-template.md - Constitution Check section compatible
- ✅ tasks-template.md - Task categorization aligns with principles
- ✅ spec-template.md - Requirements structure compatible

## Outcome

- ✅ Impact: Project constitution established as authoritative governance document for Todo Full-Stack Web Application
- 🧪 Tests: N/A (constitution is governance documentation)
- 📁 Files: Created .specify/memory/constitution.md (240 lines)
- 🔁 Next prompts: /sp.specify to create feature specifications following constitution principles
- 🧠 Reflection: Constitution provides clear guardrails for hackathon project - security-first approach with JWT, spec-driven workflow with specialized agents, and responsive UI requirements all explicitly mandated

## Evaluation notes (flywheel)

- Failure modes observed: None - constitution successfully created with all placeholders filled
- Graders run and results (PASS/FAIL): PASS - All validation checks passed (no unresolved placeholders, version coherent, dates in ISO format, principles declarative and testable)
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A - Initial constitution creation successful
