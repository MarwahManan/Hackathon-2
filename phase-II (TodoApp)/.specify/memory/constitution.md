<!--
SYNC IMPACT REPORT
==================
Version Change: NEW → 1.0.0
Rationale: Initial constitution for Hackathon Phase II Todo Full-Stack Web Application

Modified Principles: N/A (new constitution)
Added Sections:
  - Core Principles (7 principles: Accuracy, Clarity, Consistency, Security, Reproducibility, Usability, Spec-Driven)
  - Technology Stack & Constraints
  - Development Standards
  - Governance

Removed Sections: N/A

Templates Requiring Updates:
  ✅ plan-template.md - Constitution Check section aligns with security and spec-driven principles
  ✅ spec-template.md - User scenarios and requirements structure supports accuracy and clarity principles
  ✅ tasks-template.md - Task organization supports reproducibility and spec-driven workflow

Follow-up TODOs: None
-->

# Hackathon Phase II – Todo Full-Stack Web Application Constitution

## Core Principles

### I. Accuracy

All features and API behaviors MUST be implemented exactly as defined in specifications.
No deviation from spec-defined contracts, endpoints, or data models is permitted without
explicit spec amendment. This ensures predictable behavior across frontend, backend, and
database layers.

**Rationale**: In a full-stack application with multiple integration points, accuracy
prevents cascading failures and reduces debugging time. Spec adherence is the foundation
of reliable system integration.

### II. Clarity

Specifications and implementations MUST be clear and unambiguous for all team members
and Claude Code agents. All API contracts, database schemas, and UI components MUST be
documented with explicit inputs, outputs, and error conditions.

**Rationale**: Clarity enables autonomous agent execution and reduces human intervention.
Ambiguous specs lead to implementation drift and integration failures.

### III. Consistency

The following MUST remain consistent across all layers:
- Authentication patterns (JWT token verification on all protected endpoints)
- API response formats (standardized error codes and success responses)
- Database schema conventions (naming, relationships, constraints)
- UI patterns (component structure, styling, accessibility)

**Rationale**: Consistency reduces cognitive load, simplifies maintenance, and enables
code reuse. Inconsistent patterns create technical debt and increase bug surface area.

### IV. Security (NON-NEGOTIABLE)

All implementations MUST follow these security requirements:
- JWT-based authentication with token verification on every protected endpoint
- User isolation: all data queries MUST filter by authenticated user ID
- Unauthorized requests MUST return HTTP 401
- Secrets MUST be stored in environment variables, never in code
- Frontend API calls MUST include JWT in `Authorization: Bearer <token>` header
- Backend MUST validate token signature using shared secret

**Rationale**: Security violations in authentication or authorization can expose user data
and violate trust. These requirements are non-negotiable and MUST be verified in every
code review and QA cycle.

### V. Reproducibility

Implementations MUST work reliably across frontend, backend, and database layers in all
environments (development, staging, production). All dependencies, configurations, and
environment variables MUST be documented. Database migrations MUST be reversible.

**Rationale**: Reproducibility ensures that features work consistently regardless of
environment or deployment context. Non-reproducible systems create operational risk.

### VI. Usability

Frontend MUST be responsive and intuitive for all devices (desktop, tablet, mobile).
All UI components MUST follow accessibility best practices (WCAG 2.1 Level AA minimum).
Error messages MUST be user-friendly and actionable.

**Rationale**: Usability directly impacts user satisfaction and adoption. Inaccessible
or non-responsive interfaces exclude users and reduce product value.

### VII. Spec-Driven Development

All implementations MUST be based on structured specifications in the `/specs` folder.
No feature implementation may begin without a completed spec. Specs MUST be referenced
using Spec-Kit Plus conventions: `@specs/features/...`, `@specs/api/...`,
`@specs/database/...`, `@specs/ui/...`.

**Workflow**: Write/update spec → Implement via Claude Code → Validate → Deploy

**Rationale**: Spec-driven development ensures alignment between requirements and
implementation, enables autonomous agent execution, and creates a traceable record
of design decisions.

## Technology Stack & Constraints

### Approved Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Frontend | Next.js (App Router) | 16+ | Modern React framework with server components |
| Frontend Language | TypeScript | Latest | Type safety for API contracts |
| Frontend Styling | Tailwind CSS | Latest | Utility-first, responsive design |
| Backend | Python FastAPI | Latest | High-performance async API framework |
| ORM | SQLModel | Latest | Type-safe database operations |
| Database | Neon Serverless PostgreSQL | Latest | Serverless, auto-scaling database |
| Authentication | Better Auth | Latest | JWT token generation and validation |
| Development | Claude Code + Spec-Kit Plus | Latest | Autonomous spec-driven development |

### Mandatory Features (Phase II - Basic Level)

The following features MUST be implemented:
- User authentication (signup, signin, JWT token management)
- Task CRUD operations (create, read, update, delete)
- Task filtering (by status, priority, etc.)
- Task sorting (by date, priority, etc.)
- Task completion toggling

### Monorepo Structure

```
phase-II/
├── specs/                    # All feature specifications
│   └── <feature-name>/
│       ├── spec.md          # Requirements
│       ├── plan.md          # Architecture
│       └── tasks.md         # Implementation tasks
├── frontend/                # Next.js application
│   ├── app/                # App Router pages
│   ├── components/         # React components
│   └── CLAUDE.md           # Frontend-specific guidance
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── main.py        # Entry point
│   │   ├── models/        # SQLModel models
│   │   ├── routers/       # API endpoints
│   │   └── middleware/    # Auth middleware
│   └── CLAUDE.md          # Backend-specific guidance
├── history/
│   ├── prompts/           # Prompt History Records
│   └── adr/               # Architecture Decision Records
├── .specify/              # Spec-Kit Plus templates
└── .env                   # Environment variables (never commit)
```

### Environment Variables

Required configuration (MUST be in `.env`, never committed):
- `DATABASE_URL`: Neon PostgreSQL connection string
- `JWT_SECRET`: Shared secret for JWT verification
- `BETTER_AUTH_SECRET`: Better Auth configuration
- `FRONTEND_URL`: Frontend application URL
- `BACKEND_URL`: Backend API URL

## Development Standards

### API Conventions

All API endpoints MUST follow these conventions:
- Routes under `/api/` prefix
- RESTful HTTP methods (GET, POST, PUT, DELETE)
- Pydantic models for request/response validation
- Consistent error handling with proper HTTP status codes
- JWT token verification on all protected endpoints
- User-specific data filtering based on authenticated user ID

**Error Response Format**:
```json
{
  "error": "Error message",
  "detail": "Detailed explanation",
  "status_code": 400
}
```

### Database Standards

All database operations MUST follow these standards:
- SQLModel ORM for all database interactions
- Neon Serverless PostgreSQL best practices
- Proper indexes on frequently queried columns
- Foreign key constraints for relationships
- Migrations for all schema changes
- User ID filtering on all user-specific queries

### Frontend Standards

All frontend code MUST follow these standards:
- Next.js App Router conventions
- TypeScript for type safety
- Tailwind CSS for styling
- Responsive design (mobile-first)
- Accessibility (WCAG 2.1 Level AA)
- JWT token in `Authorization` header for all API calls
- Proper error handling and loading states

### Spec-Kit Plus Workflow

All development MUST follow this workflow:
1. `/sp.specify` - Create/update feature specification
2. `/sp.plan` - Generate architectural plan
3. `/sp.tasks` - Break down into implementation tasks
4. `/sp.implement` - Execute tasks via specialized agents
5. Validate and test
6. Create PHR (Prompt History Record)
7. Suggest ADR if architecturally significant decisions made

### Specialized Agent Usage

MUST use appropriate specialized agents for each layer:
- `auth-security-architect` - Authentication and security
- `neon-db-architect` - Database schema and queries
- `fastapi-backend-architect` - Backend API implementation
- `nextjs-ui-architect` - Frontend UI implementation
- `ui-upgrader` - UI design improvements
- `spec-doc-writer` - Specification documentation
- `integration-qa-specialist` - End-to-end testing

**Rule**: Never implement features manually. Always delegate to the correct agent
via the Task tool.

## Governance

### Amendment Process

This constitution may be amended through the following process:
1. Identify need for amendment (new principle, constraint, or standard)
2. Document proposed change with rationale
3. Update constitution with version bump (see versioning below)
4. Update all dependent templates and documentation
5. Create Sync Impact Report
6. Obtain user approval
7. Commit with message: `docs: amend constitution to vX.Y.Z (description)`

### Versioning Policy

Constitution versions follow semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR**: Backward-incompatible changes (principle removal, constraint changes)
- **MINOR**: New principles, sections, or material expansions
- **PATCH**: Clarifications, wording improvements, typo fixes

### Compliance Review

All implementations MUST be reviewed for constitution compliance:
- Code reviews MUST verify adherence to security principles
- QA MUST validate spec accuracy and reproducibility
- Integration tests MUST verify consistency across layers
- Complexity violations MUST be justified in plan.md

### Enforcement

- All PRs MUST pass constitution compliance checks
- Violations MUST be documented and justified in Complexity Tracking section
- Unjustified violations MUST be rejected
- Repeated violations require constitution amendment or implementation redesign

**Version**: 1.0.0 | **Ratified**: 2026-02-09 | **Last Amended**: 2026-02-09
